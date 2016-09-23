(function(){
    angular.module('app').factory('dataService',['$q','$timeout','$http','constants',dataService]);

    function dataService($q,$timeout,$http,constants) {
        return {
        
        getAllBooks:getAllBooks,
        getAllReaders: getAllReaders
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
        }
        }());
