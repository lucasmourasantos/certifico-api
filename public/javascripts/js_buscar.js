$(document).ready(function(){

    $('#cpf').keyup(function(){

        $('form').submit(function(){
            var dados = $(this).serialize();

            $.ajax({
                url: '../buscar_parti.php',
                method: 'post',
                dataType: 'html',
                data: dados,
                success: function(data){
                    $('#resultado').empty().html(data);
                }
            });

            return false;
        });

        $('form').trigger('submit');

    });
});













//$('#formInscricao').on('submit', function(event){
//    event.preventDefault();
//    var dados = $(this).serialize();
//    
//    $.ajax({
//        url: '../buscar_parti.php',
//        type: 'post',
//        dataType: 'json',
//        data: 'dados',
//        success: function(response){
//            console.log(response);
//        }
//    })
//})
//
////$('#formInscricao').on('submit',function(event){
////    event.preventDefault();
////    var dados=$(this).serialize();
////
////    $.ajax({
////        url: '../buscar_parti.php',
////        type: 'post',
////        dataType: 'json',
////        data: dados,
////        success: function(response){
////                        $('.resultadoForm table tbody').empty();
////                        $.each(response,function(key,value){
////                            if(value.nota > 6){
////                                $('.resultadoForm table tbody').append("<tr> <td>" + value.cpf + "</td> <td>" + value.nome + "</td> </tr> ");
////                            }
////                        });
////            console.log(response);
////        }
////    });
////});