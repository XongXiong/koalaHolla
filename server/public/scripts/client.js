console.log( 'js' );

$( document ).ready( f1 );

function f1(){
  console.log( 'JQ' );
  // load existing koalas on page load
  // add koala button click
  $( '#addButton' ).on( 'click', addKoala);
  $( '#viewKoalas' ).on( 'click', ".deleteButton", deleteKoala);
  $( '#viewKoalas' ).on( 'click', ".markReady",markReady);
  getKoalas();
  //hideReady();

} // end doc ready

function deleteKoala() {
  var koalaId = $(this).data("id");
console.log("deleted Koala :(",  $(this).data("id"));
$.ajax ({
  type: 'DELETE',
  url: '/koalas/' + koalaId,
}).done(function(response){
  console.log(response);
  $(this).parent().parent().remove();
  getKoalas();
}).fail(function(error){
  console.log('Sad Koalas :(');
});


}

function markReady() {
  var koalaId = $(this).data("id");
console.log('super ready koalas!');
  $(this).remove();
$.ajax ({
  type: "PUT",
  url: '/koalas/'+ koalaId,
}).done(function(response){
  console.log(response);
  getKoalas();
});
}

function addKoala(){
  console.log( 'in addButton on click' );
  // get user input and put in an object
  // NOT WORKING YET :(
  // using a test object
  var objectToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    readyForTransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val()
  };

  console.log(objectToSend);
  // call saveKoala with the new obejct
  saveKoala( objectToSend );
} //end addButton on click

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      appendKoalas(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      getKoalas();

    } // end success
  }); //end ajax
}

//var j = 0;

function appendKoalas(koalas){
  console.log('in append koalas!');
  $('#viewKoalas').empty();
  $("#nameIn").val('');
  $("#ageIn").val('');
  $("#genderIn").val('');
  $("#readyForTransferIn").val('');
  $("#notesIn").val('');
  //loop through products and append to dom
    for (var i = 0; i < koalas.length; i++) {
      //added an 's'
      var koala = koalas[i];
      var $trow = $('#viewKoalas').append('<tr></tr>');
      console.log(koala.ready);
      if (koala.ready == 'false') {
      $($trow).append('<td>' + koala.name + '</td> <td>' + koala.age + '</td> <td>' + koala.gender + '</td> <td>' + koala.notes + '</td> <td>' + koala.ready + '</td> <td> <button type=button class="markReady transfer btn btn-primary" data-id =" ' + koala.id + '">  Ready for Transfer </button> </td> <td> <button type="button" class= "deleteButton btn btn-danger" data-id= "' + koala.id + '"> Delete </button> </td>');

      } else {
        $($trow).append('<td>' + koala.name + '</td> <td>' + koala.age + '</td> <td>' + koala.gender + '</td> <td>' + koala.notes + '</td> <td>' + koala.ready + '</td> <td> </td> <td> <button type="button" class= "deleteButton btn btn-danger" data-id= "' + koala.id + '"> Delete </button> </td>');

      }

  //hideReady();
}
}
/*function hideReady() {
  //array of rows:
  var $rows = $('#viewKoalas').children();
  for (i = 0; i < $rows.length; i++) {
    var thisCell = $rows[i];
    console.log(thisCell);
    var theseCells = $(thisRow).children();
    // console.log(theseCells);
    var isReady = $(theseCells[4]).text();
    // console.log(isReady);
    if (isReady === 'true') {
      console.log('to be removed');
    }
  }
*/

  // var isReady = $('.readyfreddy').text();
  // if (isReady === 'true') {
  //   console.log($('.readyfreddy').parent().parent().children[5]);
  // }
//}
