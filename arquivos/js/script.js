
$(window).on('load', function(){
    var cep, itemScroll, targetOffSet,
        inputCep = $('input[name="cep"]');

    $(inputCep).focus();
    $(inputCep).mask('00000-000');
    scrollDelay();

    $('#form-cep button').on('click', function(event){
        event.preventDefault(); 
        getInformationAddress();
    })

    function getInformationAddress(){

        cep = $(inputCep).val().replace('-','');
        validateCep(cep);

        $.ajax({
            url: 'https://viacep.com.br/ws/'+cep+'/json/',
            method: 'get',
            dataType: 'json',
            success: function(data){
                appendData(data);
            }
        })
    }

    function validateCep(cep){
        
        if(cep.length == 8){
            $(inputCep).removeClass('invalid')
            $(inputCep).attr("placeholder", "Digite seu cep")
        }else{
            $(inputCep).addClass('invalid')
            $(inputCep).val("").attr("placeholder", "Cep inválido! Digite novamente.")           
        }
    }

    function appendData(data){
        var structureHtmlAdress = '<p><b>Rua:</b> '+data.logradouro+'</p>'+ 
                                '<p><b>Bairro:</b> '+data.bairro+'</p>'+
                                '<p><b>Cidade:</b> '+data.localidade+'</p>'+
                                '<p><b>Estado:</b> '+data.uf+'</p>';

        $('.information-address p').remove();
        $('.code-ibge .code').text('');
        
        $('.information-address').append(structureHtmlAdress);
        $('.code-ibge .code').text(data.ibge);
        
        $('.type-your-cep p').addClass('active');
        $('.information-about-cep').addClass('active');
    }

    function scrollDelay(){
        itemScroll = $('.type-your-cep p a');

        $(itemScroll).on('click', function(e){
            e.preventDefault();
            var id = $(itemScroll).attr('href');
            targetOffSet = $(id).offset().top;

            $('html, body').animate({ 
                scrollTop: targetOffSet
            }, 1000)
        })
    }

})