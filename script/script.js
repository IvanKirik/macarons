document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}
document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

$('a').click(function () {
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top + 'px'
    }, {
        duration: 1000,
        easing: 'swing'
    });
    return false;
});

let inputProduct = $('#input-product');
let inputName = $('#input-name');
let inputPhone = $('#input-phone');
let loader = $('.loader');

$(function(){
    inputPhone.mask("+375 29 999 99 99");
});

$('#btn').click(function () {

    let hasError = false;

    $('.error-input').hide();

    if (!inputProduct.val()) {
        inputProduct.next().show();
        inputProduct.css(
            {
                border: '1px solid red',
                marginBottom: '3px',
            });
        hasError = true;
    } else {
        inputProduct.css(
            {
                marginBottom: '16px',
            });
    }

    if (!inputName.val()) {
        inputName.next().show();
        inputName.css(
            {
                border: '1px solid red',
                marginBottom: '3px',
            });
        hasError = true;
    } else {
        inputName.css(
            {
                marginBottom: '16px',
            });
    }

    if (!inputPhone.val()) {
        inputPhone.next().show();
        inputPhone.css(
            {
                border: '1px solid red',
                marginBottom: '3px',
            });
        hasError = true;
    } else {
        inputPhone.css(
            {
                marginBottom: '16px',
            });
    }

    if (!hasError) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {product: inputProduct.val(), name: inputName.val(), phone: inputPhone.val()},
        })
            .done(function (message) {
                loader.css('display', 'none');
                console.log(message)
                if (message.success) {
                    $('.order-form-container').css('display', 'none');
                    $('.order-form-tittle').css('display', 'none');
                    $('.order-true').css('display', 'block');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                }
            });
    }
})