define(['jlazyload'], () => {
    return {
        init: function() {
            const $list = $('.list ul');
            //1.渲染list.html页面
            $.ajax({
                url: 'http://10.31.160.88/mi/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                                <img src="${value.url}"/>
                                <p>${value.titleq}</p>
                                <p>${value.title.slice(0,15)+' ...'}</p>
                                <span>￥${value.price}元起</span>
                            </a>
                        </li>
                    `;
                });
                $list.html($strhtml);
            });
        }
    }
});