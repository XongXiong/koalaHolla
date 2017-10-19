console.log( 'js' );

$( document ).ready( f1 );

function f1(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();
  // add koala button click
  $( '#addButton' ).on( 'click', addKoala);
  $( '#deleteButton' ).on( 'click', deleteKoala);
  $( '#markReadyButton' ).on( 'click', markReady);

} // end doc ready

function deleteKoala() {
console.log()
}

function markReady() {

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

function appendKoalas(koalas){
  $('#viewKoalas').empty();
  //loop through products and append to dom
  for (var i = 0; i < koalas.length; i++ ){
    //added an 's'
    var koala = koalas[i];
    var $trow = $('#viewKoalas').append('<tr></tr>');
    $($trow).append('<td>' + koala.name + '</td> <td>' + koala.age + '</td> <td>' + koala.gender + '</td> <td>'+ koala.notes +'</td> <td>' + koala.ready + '</td> <td> <button class = "markReady" data-id =" ' + koala.id + '">  Ready for Transfer </button> </td> <td> <button class= "deleteButton" data-id= "' + koala.id + '"> Delete </button> </td>');
  }
}
