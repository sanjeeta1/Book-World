(function(){
    angular.module('app').factory('dataService',['$q','$timeout','$http','constants',dataService]);

    function dataService($q,$timeout,$http,constants) {
        return {
        
        getAllBooks:getAllBooks,
        getAllReaders: getAllReaders,
        getBookByID:  getBookByID,
        updateBook: updateBook
        };
        function getAllBooks()
        {
        return $http({
        method:'GET',
        url:'api/books',
        headers:{
        'PS-BookLogger-Version':constants.APP_VERSION
        }
        })
        .then(sendResponseData)
        .catch(sendGetBooksError);
        }
        function sendResponseData(response)
        {
        return response.data;
        }
        function sendGetBooksError(response)
        {
        return $q.reject('Error retrieving book(s). (HTTP status:'+response.status +')');
        }
        function getBookByID(bookID){
        return http({
            method:'GET',
             url:'api/books/'+bookID
            }).then(sendResponseData).catch(sendGetBooksError);
        }
        function addBook(newBook)
        {
            return $http({
                method: 'POST',
                url: 'api/books',
                data: newBook
            })
            .then(addBookSuccess).catch(addBookError);
        }
        function addBookSuccess(response){
            return 'Book added: ' +response.config.data.title;
        }
        function addBookError(response)
        {
            return $q.reject('Error adding book. (HTTP status: '+response.status+ ')');
        }
        
        }
        
        }());
