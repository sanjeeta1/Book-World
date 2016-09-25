(function(){
    angular.module('app').factory('dataService',['$q','$timeout','$http','constants',dataService]);

    function dataService($q,$timeout,$http,constants) {
        return {
        
        getAllBooks:getAllBooks,
        getAllReaders: getAllReaders,
        getBookByID:  getBookByID,
        updateBook: updateBook,
        addBook: addBook
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
        return $http.get('api/books/'+bookID).then(sendResponseData).catch(sendGetBooksError);
        }
        function addBook(newBook)
        {
            return $http.post('api/books',newBook)
            .then(addBookSuccess).catch(addBookError);
        }
        function addBookSuccess(response){
            return 'Book added: ' +response.config.data.title;
        }
        function addBookError(response)
        {
            return $q.reject('Error adding book. (HTTP status: '+response.status+ ')');
        }
        function updateBook(book)
        {
          return $http({
                method: 'PUT',
                url:'api/books/' +book.book_id,
                data:book }).then(updateBookSuccess).catch(updateBookError);
        }
        function updateBookSuccess(response)
        {
            return 'Book updated:'+response.config.data.title;
        }
         function updateBookError(response)
        {
            return $q.reject('Error updating book.(HTTP status: '+response.status + ')');
        }
        function deleteBook(bookID)
        {
            return $http({
                method: 'DELETE',
                url: 'api/books/' + bookID
            }).then(deleteBookSuccess).catch(deleteBookError);
        }
        function deleteBookSuccess(response)
        {
            return 'Book deleted.';
        }
        function deleteBookError(response)
        {
            return $q.reject('Error deleting book.(HTTP status: '+response.status+ ')');
        }
        }
        
        }());
