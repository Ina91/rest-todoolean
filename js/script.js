// usare Create, Read, Update e Delete

$(document).ready(function(){
    getData();
    $(document).on('click','span.delete',function(){
        var elemento = $(this);
        var idToDo = elemento.parent().attr('data-id');
        deleteElement(idToDo);
    });

    $('.inserisci').click(function(){
        var newElement = $('#nuova-voce').val();
        createElement(newElement);
    });

    $(document).on('click', 'span.testo',function(){
        var elemento = $(this);
        $('.testo').removeClass('hidden');
        elemento.addClass('hidden');

        $('.testo').next().addClass('hidden');
        elemento.next().removeClass('hidden');
    });

    $(document).on('keydown','.input-add',function(){
        var idNewElement = $(this).parent().attr('data-id');
        if (event.which == 13 || event.keyCode == 13) {
            var newElement = $(this).val();
            updateElement(idNewElement,newElement);
        }
    });
});


//***FUNZIONI***

function updateElement(id,elemento){
    $.ajax(
        {
            url:'http://157.230.17.132:3021/todos/' +id,
            method:'PUT',
            data: {
                text: elemento
            },
            success: function(risposta){
                $('.todos').html('');
                getData();
            },
            error: function(){
                alert(' errore !');
            }
        }
    );
};

//fz POST
function createElement(data){
    $.ajax(
        {
            url:'http://157.230.17.132:3021/todos/',
            method:'POST',
            data: {
                text: data
            },
            success: function(risposta){
                $('.todos').html('');
                getData();
            },
            error: function(){
                alert(' errore !');
            }
        }
    );
}

// FZ DELETE uso metodo delete
function deleteElement(id){
    $.ajax(
        {
            url:'http://157.230.17.132:3021/todos/' + id,
            method:'DELETE',
            success: function(risposta){
                $('.todos').html('');
                getData();
            },
            error: function(){
                alert(' errore !');
            }
        }
    );

}


function getData(){
    $.ajax(
        {
            url:'http://157.230.17.132:3021/todos',
            method:'GET',
            //NON uso data:'', perchè non passo un parametro
            success: function(risposta){
                getElement(risposta);
            },
            error: function(){
                alert('si è verificato un errore !');
            }
        }
    );
}
function getElement(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < data.length; i++){
        var context = {
            text: data[i].text,
            id: data[i].id
        }
        var html = template(context);
        $('.todos').append(html);
    }
}
