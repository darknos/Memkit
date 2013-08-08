function CustomGrid(opt, items) {
    var language = opt.language;
    var self = this.view = Ti.UI.createScrollView(opt);
    self.scrollType = "vertical";

    this.gridItems = items || [];
    this.itemWidth = opt.itemWidth || 10;
    this.columns = opt.columns || 'auto';

    if(this.columns !== 'auto')
        this.cols = this.columns;

    this.itemHeight = opt.itemHeight || 10;
    this.marginLeft = opt.marginLeft || 0;
    this.marginRight = opt.marginRight || 0;
    this.marginTop = opt.marginTop || 0;
    this.marginBottom = opt.marginBottom || 0;
    
    var tableHeader;
    if (opt.pullToRefresh) {
        
        tableHeader = this.tableHeader = Ti.UI.createView({
            //backgroundColor:"#e2e7ed",
            //borderColor:"white", borderWidth: 1,
            touchEnabled: false,
            top: -60,
            width:225,
            height:60,
            visible: true,
        });
        
        //fake it til ya make it..  create a 2 pixel
        //bottom border
        //this.tableHeader.add(border);
        
        var arrow = Ti.UI.createView({
            touchEnabled: false,
            backgroundImage:"/images/whiteArrow.png",
            width:23,
            height:60,
            bottom:0,
            left:0
        });
        
        var statusLabel = Ti.UI.createLabel({
            touchEnabled: false,
            text:L(language+"_pull_to_reload"),
            left:24,
            right: 0,
            bottom:30,
            height:14,
            color:"#bbbbbb",
            textAlign:"center",
            font:{fontSize:14,fontWeight:"bold"},
            shadowColor:"#333399",
            shadowOffset:{x:1,y:0}
        });
        
        var lastUpdatedLabel = Ti.UI.createLabel({
            touchEnabled: false,
            text:L(language+"_updated")+" "+String.formatDate(new Date())+ " " +String.formatTime(new Date()),
            left:24,
            right: 0,
            bottom:15,
            height:12,
            color:"#bbbbbb",
            textAlign:"center",
            font:{fontSize:12},
            shadowColor:"#333399",
            shadowOffset:{x:1,y:0}
        });
        var isAndroid = Ti.Platform.osname == 'android';
        
        var actInd = Titanium.UI.createActivityIndicator({
            left:0,
            bottom:13,
            width:30,
            height:30
        });
        
        this.tableHeader.add(arrow);
        this.tableHeader.add(statusLabel);
        this.tableHeader.add(lastUpdatedLabel);
        
        if (!isAndroid)
            this.tableHeader.add(actInd);
        
        
        this.view.add(this.tableHeader);
        var pull = 0, loading, readyToPull = 0;
        var setLoading = function(){
            loading = 1;
            //self.contentOffset = {x:0, y:-60};
            statusLabel.text = L(language+"_loading");
            arrow.hide();
            if (!isAndroid)
                actInd.show();
        };
        var setLoaded = function(scrollToTop){
            if (!isAndroid)
                actInd.hide();
            arrow.show();
            arrow.animate({transform: Ti.UI.create2DMatrix({rotate:0}), duration: 180});
            statusLabel.text = L(language+"_pull_to_reload");
            readyToPull = false;
            lastUpdatedLabel.text = L(language+"_updated")+" "+String.formatDate(new Date())+ " " +String.formatTime(new Date());
            //if (scrollToTop)
            //  self.contentOffset = {x:0, y:0};
            pull = 0;
            loading = 0;
        };
        this.view.addEventListener("setLoading", function(e){
            setLoading();
        });
        this.view.addEventListener("setLoaded", function(e){
            setLoaded(e.scrollToTop);
        });
        this.view.addEventListener("scroll", function(e){
            ////Ti.API.info(e);
            if (e.source !=self) return;
            if (pull) {
                pull = 0;
                this.contentOffset = {x:0, y:-60};
            }
            if (loading) return;
            if (!e.decelerating && e.dragging) {
                if (e.y < -65 && !readyToPull) {
                    readyToPull = 1;
                    arrow.animate({transform: Ti.UI.create2DMatrix({rotate:-180}), duration: 200});
                    statusLabel.text = L(language+"_release_to_reload");
                }
                if (e.y > -65 && readyToPull) {
                    readyToPull = 0;
                    arrow.animate({transform: Ti.UI.create2DMatrix({rotate:0}), duration: 200});
                    statusLabel.text = L(language+"_pull_to_reload");
                }
                //tableHeader.visible = e.y < -60;
            }
            if (e.decelerating == 1 && !e.dragging && tableHeader.visible) {
                if (readyToPull) {
                    setLoading();
                    opt.refreshCallback(setLoaded);
                }
    
            }
        });
        
        
    }

    this.calcSpaces = function() {
        this.xSpace = Math.round((this.view.size.width - (this.cols * this.itemWidth) - this.marginLeft * 2) / (this.cols + 1));
        this.xSpace = this.xSpace < 0 ? 0 : this.xSpace;
        this.ySpace = typeof this.ySpace == 'undefined' ? this.xSpace : this.ySpace;
    }

    this.calcCols = function() {
        this.cols = Math.floor((this.view.size.width - this.marginLeft - this.marginRight) / (this.itemWidth));
        if (this.cols == 0) this.cols = 1;
        ////Ti.API.info(this.view.size.width + " " + this.itemWidth);
    }

    this.holder = Ti.UI.createView({
        left : this.marginLeft,
        top : this.marginTop,
        right : this.marginRight,
        height : 700,
    });
    this.view.add(this.holder);

    //only vertical scroll
    this.view.contentWidth = 'auto';
    this.view.contentHeight = 'auto';
    this.view.showVerticalScrollIndicator = true;

    this.addGridItems = function(list) {
        for(var i = 0; i < list.length; i++) {
            this.addGridItem(list[i], i);
        }
    };
    this.addGridItem = function(item, rand, hidden) {
        try {
        if(rand||hidden) item.hide();
        this.gridItems.push(item);
        this.moveItem(item, rand||hidden);
        this.holder.add(item);
        if(rand) {
                var t = Math.round(Math.random() * 200);
                item.top = item.toY +  t * (Math.random()*2 > 1 ? -1 : 1);
                var l = Math.round(Math.random() * 200);
                item.left = item.toX + l * (Math.random()*2 > 1 ? -1 : 1);
        }
        if (hidden) {
            item.top = 0;
            item.left = - this.itemWidth - this.xSpace * 2;
        }
        } catch(e) {
            throw e;
        }
    };
    this.insertGridItem = function(index, item, rand, hidden) {
        if(rand||hidden) item.hide();
        this.gridItems.splice(index,0,item);
        this.moveItem(item, rand||hidden);
        this.holder.add(item);
        if(rand) {
                var t = Math.round(Math.random() * 200);
                item.top = item.toY +  t * (Math.random()*2 > 1 ? -1 : 1);
                var l = Math.round(Math.random() * 200);
                item.left = item.toX + l * (Math.random()*2 > 1 ? -1 : 1);
        }
        if (hidden) {
            item.top = 0;
            item.left = - this.itemWidth - this.xSpace * 2;
        }

    };
    this.removeAllGridItems = function() {
        for(var i = 0; i < this.gridItems.length; i++) {
            this.holder.remove(this.gridItems[i]);
        }
        this.gridItems = [];
    };
    this.removeGridItem = function(item) {
        var ind = this.gridItems.indexOf(item);
        this.gridItems.splice(ind, 1);
        this.holder.remove(item);
    };
    this.moveItem = function(item, fake) {
        if( typeof this.cols == 'undefined')
            this.calcCols();
        if( typeof this.xSpace == 'undefined')
            this.calcSpaces();
        var ind = this.gridItems.indexOf(item);
        var row = Math.floor(ind / this.cols);
        var col = ind - row * this.cols;
        var x = this.xSpace + (this.itemWidth + this.xSpace) * col;
        var y = (this.itemHeight + this.ySpace) * row;
        item.toX = x;
        item.toY = y;
        if(!fake) {
            item.left = x;
            item.top = y;
        }
        item.width = this.itemWidth;
        //this.holder.height = y + this.itemHeight + this.ySpace + this.marginBottom;
        ////Ti.API.info(this.holder.size.width + " " + this.holder.size.height + " " + (this.holder.center.x) + " " + this.holder.center.y);
    };
    this.rearrange = function(animate, onlyFirstN, resize, newWidth) {
        if(!onlyFirstN)
            onlyFirstN = this.gridItems.length;
        delete this.xSpace;
        if(this.columns == 'auto')
            delete this.cols;
        if(resize) {
            this.itemWidth = newWidth;
        }
        for(var i = 0; i < this.gridItems.length; i++) {
            var item = this.gridItems[i];
            if(resize) {
                item.width = newWidth;
            }
            this.moveItem(item, animate && i < onlyFirstN);
            if(animate && i < onlyFirstN) {
                var t = Math.round(Math.random() * 200);
                item.top = item.toY +  t * (Math.random()*2 > 1 ? -1 : 1);
                var l = Math.round(Math.random() * 200);
                item.left = item.toX + l * (Math.random()*2 > 1 ? -1 : 1);
                item.animate({
                    left : item.toX,
                    top : item.toY,
                    duration : 200
                });
            }
        };
    };
    this.arrange = function(animate, onlyFirstN) {
        if(!onlyFirstN)
            onlyFirstN = this.gridItems.length;
        for(var i = 0; i < this.gridItems.length; i++) {
            var item = this.gridItems[i];
            this.moveItem(item,1);
            item.show();
            if(animate && i < onlyFirstN) {
                item.animate({
                    left : item.toX,
                    top : item.toY,
                    duration : 200
                });
            } else {
                item.left = item.toX;
                item.top = item.toY;
            }
        };
    };
    this.update = function() {
        if (this.gridItems.length > 0) {
            //Ti.API.info("GRID UPDATED:" + (parseInt(this.gridItems[this.gridItems.length-1].toY) + parseInt(this.itemHeight) + parseInt(this.ySpace) + parseInt(this.marginBottom)));
            this.holder.height = parseInt(this.gridItems[this.gridItems.length-1].toY) + parseInt(this.itemHeight) + parseInt(this.ySpace) + parseInt(this.marginBottom) + parseInt(this.marginTop);
            this.view.contentHeight = parseInt(this.gridItems[this.gridItems.length-1].toY) + parseInt(this.itemHeight) + parseInt(this.ySpace) + parseInt(this.marginBottom) + parseInt(this.marginTop);
        }
    }
};


module.exports = CustomGrid;