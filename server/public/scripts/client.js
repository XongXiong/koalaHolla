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

}

function markReady() {

}

function addKoala(){
  console.log( 'in addButton on click' );
  // get user input and put in an object
  // NOT WORKING YET :(
  // using a test object
  var objectToSend = {
    name: 'testName',
    age: 'testName',
    gender: 'testName',
    readyForTransfer: 'testName',
    notes: 'testName',
  };
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
    } // end success
  }); //end ajax
}
