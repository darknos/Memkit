function loadArticle(id) {
    $.getJSON("http://mignews.com/export/json/article.php?article_id=" + id, function(data) {
        $("#holder").html("Загрузка...");
        if (data && 200 == data.meta.status) {
            var article = data.response.article;
            article.text = article.text.replace(/<img src="\/aimages/g, '<img src="http://mignews.com/aimages');
            article.related = data.response.related;
            article.formatted_time = function() {
                var d = moment(this.time);
                return d.format("L");
            };
            article.formatted_ts = function() {
                var d = moment(this.time);
                return d.format("L") + " " + d.format("HH:mm");
            };
            $("#holder").html(ich.article_template(article));
            $("a").bind("click", function() {
                return false;
            });
            $("body").get(0).scrollTop = 0;
        } else $("#holder").html("Ошибка загрузки!");
    });
}

function clearArticle() {
    $("#holder").html("");
}

var data = {
    meta: {
        status: 200
    },
    response: {
        article: {
            id: "100413_203321_27335",
            head: "Иран построит ядерные объекты в сейсмоопасной зоне",
            text: 'Иран планирует построить больше ядерных реакторов в сейсмоопасных прибрежных районах. Об этом сообщили иранские СМИ в среду, на следующий день после того, как в стране произошло сильное землетрясение.\r\n\r\nВо вторник были зафиксированы подземные толчки магнитудой 6,3 в 89 км к юго-востоку от Бушера, в результате чего погибло 37 человек и ранено более 900. Среди погибших восемь детей в возрасте до 10 лет.\r\n\r\nК счастью, АЭС, которая находится в 18 км к югу от Бушеры, не пострадала, сообщают иранские чиновники и компания, построившая объект.\r\n\r\nТегеран неоднократно отвергал озабоченность по поводу безопасности Бушера, который расположен в сейсмоопасной зоне на побережье Персидского залива.\r\n\r\n"Бушерская АЭС была разработана так, что способна противостоять подземным толчкам более 8,0 баллов по шкале Рихтера", - сказал глава МАГАТЭ.\r\n\r\nАЭС в Бушере имеет шесть энергетических реакторов, и планируется строительство еще двух реакторов мощностью не менее тысячи мегаватт. Строительство начнется в "ближайшее время". Иран определил места для строительства еще 16 ядерных объектов в разных районах страны.\r\n\r\nВ докладе, опубликованном на прошлой неделе в США Фондом Карнеги и федерацией американских ученых говорится, что реактор в Бушере находится на пересечении трех тектонических плит, поэтому постоянно существует угроза его разрушения в результате землетрясения.\r\n\r\nПо оценкам экспертов, ущерб от землетрясения в Бушере оценивается в 11 млрд долларов, что делает его одним из самых "дорогих" землетрясений в мире.\r\n\r\nУолт Паттерсон, эксперт по энергетической инфраструктуре из Королевского института Великобритании считает, что иранские ядерные планы "очень опрометчивыми" как с точки зрения финансовых затрат, так и по и ряду технологических причин.\r\n\r\nИран заявляет, что его ядерная программа носит исключительно мирные цели, но западные державы подозревают, что она также направлена на разработку ядерного оружия.',
            time: "2013-04-10 22:00:00",
            section: "Политика",
            link: "http://www.mignews.com/news/politic/world/100413_203321_27335.html",
            image: "http://www.mignews.com/aimages/04_13/100413_203321_27335_2.jpg"
        },
        related: [ {
            id: "090413_123706_28598",
            head: "Иранцы нашли братьев в Латинской Америке",
            time: "2013-04-10 12:48:00",
            section_id: "432",
            section: "Экспертиза"
        }, {
            id: "100413_102559_88156",
            head: "Мощное землетрясение в Иране: десятки погибли, сотни ранены",
            time: "2013-04-10 10:45:00",
            section_id: "21",
            section: "Происшествия"
        }, {
            id: "090413_212722_82655",
            head: "Либерман: Запад мирится с Ираном, как с нацистами в 1938м",
            time: "2013-04-09 21:45:00",
            section_id: "7",
            section: "Политика"
        }, {
            id: "090413_182417_36193",
            head: "Число жертв землетрясения в Бушере возросло",
            time: "2013-04-09 18:29:00",
            section_id: "21",
            section: "Происшествия"
        }, {
            id: "090413_163810_13827",
            head: "Мощное землетрясение в Бушере",
            time: "2013-04-09 16:38:00",
            section_id: "21",
            section: "Происшествия"
        }, {
            id: "090413_104731_72629",
            head: "Иран начал разработку новых урановых рудников и открыл завод",
            time: "2013-04-09 10:47:00",
            section_id: "7",
            section: "Политика"
        }, {
            id: "070413_151614_25422",
            head: "Иран предупредил Америку о последствиях войны в Корее",
            time: "2013-04-07 15:16:00",
            section_id: "7",
            section: "Политика"
        }, {
            id: "060413_114829_27008",
            head: "В Алма-Аты начался второй день переговоров по Ирану",
            time: "2013-04-06 11:48:00",
            section_id: "7",
            section: "Политика"
        }, {
            id: "050413_195032_73754",
            head: 'Иран не может дать "Шестерке" четкий ответ',
            time: "2013-04-05 20:15:00",
            section_id: "7",
            section: "Политика"
        }, {
            id: "050413_90429_00330",
            head: "17 кавказских городов просят, чтобы их аннексировал Иран",
            time: "2013-04-05 09:04:00",
            section_id: "7",
            section: "Политика"
        } ]
    }
};

$(document).ready(function() {
    loadArticle("080413_132153_23425");
});