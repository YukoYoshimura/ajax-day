$(function () {
    $("").click(function () {
        // 入力された値を取得
        const zipcode = $("#zipcode").val();
        console.log(zipcode);
        // urlを設定
        var url = "https://zipcloud.ibsnet.co.jp/api/search";
        // 送るデータを成形する
        var param = { zipcode: $("#zipcode").val() };
        // サーバーと通信(Ajax)
        
        $.ajax({
            type: "GET", 
            cache: false,
            data: param,
            url: "index.html",
            dataType: "jsonp"
        })
        .done(function (res) {
            if (res.status != 200) {
                // 通信には成功。APIの結果がエラー
                // エラー内容を表示
                $('#zip_result').html(res.message);
            } else {
                //住所を表示
                var html = '';
                for (var i = 0; i < res.results.length; i++) {
                    var result = res.results[i];
                    console.log(res.results);
                    html += '<p>都道府県コード：' + result.prefcode + '</p>';

                    $("#zip_result").html(html);
                }
            }

        })
        .fail(function (error) {
            console.log(error);
            $('#zip_result').html("<p>通信エラーです。時間をおいてお試しください</p>");
        });
    });
});