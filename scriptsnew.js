var teacherName = prompt ("What is the teacher's name?");
var className = prompt ("What is the class name?");
teacherName;
className;
//var teacherName = "Mr. Burrows";
//var className = "Physical Science";

document.getElementById('teacherName').innerText = teacherName;
document.getElementById('className').innerText = className;

var classRoll = {
    student: [],

    addStudent: function (studentName) {
        this.student.push({
            name: studentName,
            present: false,
            tarde: false,
            comments: "",
        });
    },
    deleteStudent: function(position) {
        this.student.splice(position, 1); 
    },
    togglePresent: function (position) {
        this.student[position].present = !this.student[position].present;
       
    },
    toggleTarde: function (position) {
        this.student[position].tarde = !this.student[position].tarde;
    },
    addEditComments: function (position, comments) {
        this.student[position].comments = comments;
        
    },
    toggleAllPresent: function () {
        var totalPresent = this.student.length;
        var allPresent = 0;
        for (i = 0; i < totalPresent; i++) {
           if (this.student[i].present === true) {
             allPresent++;
           }

        }
        if (allPresent === totalPresent) {
            for (i=0 ; i< totalPresent; i++) {
                this.student[i].present = false;
                this.student[i].tarde = false;
            }
        }else {
            for (i=0; i< totalPresent; i++){
                this.student[i].present = true;
            
            }
        }
           
        }
        
    }
//classRoll.addStudent('Guillermo Ernesto Hernandez');


var handlers = {
    addStudent: function (){
        var addStudentInput = document.getElementById("addStudentInput");
        if (addStudentInput.value === "") {
            alert("You must write a student's name");
          } else {
            classRoll.addStudent(addStudentInput.value);
          }
          addStudentInput.value = "";
          view.displayStudents();
    },
    togglePresent: function (position) {
        classRoll.togglePresent(position) 
        view.displayStudents();    
    },
    toggleTarde: function (position) {
        if (classRoll.student[position].present === false){
            alert("Please mark student as present first");
          } else {
            classRoll.toggleTarde(position);
            //toggleTardeStudentPosition.value = '';
          }
          view.displayStudents();
        //classRoll.toggleTarde(position) 
        //view.displayStudents();    
    },
    toggleAllPresent: function (){
        classRoll.toggleAllPresent();
        view.displayStudents();
    },
    addEditComments: function(position) {
        //var addEditCommentsPosition = document.getElementById('addEditCommentsPosition');
        //console.log('position', position); check position being called
        var addEditComments = document.getElementsByClassName('addEditCommentsInput')[position];
        classRoll.addEditComments(position,addEditComments.value);
        //addEditCommentsPosition.value = '';
        addEditComments.value = 'add/edit comments';
        view.displayStudents();
      },
    //position is called from the eventlistener
    deleteStudent: function(position){
        classRoll.deleteStudent(position);
        view.displayStudents();
    }

    // deleteStudent: function () {
    //     var deleteStudentPositionInput = document.getElementBy
    //     classRoll.deleteStudent()
    //     deleteStudentPositionInput.value = '';
    //     view.displayStudents();
    // }

    
}
var studentLi = document.createElement('li');
var studentOl = document.querySelector('#studentList');

var view = {
    displayStudents: function() {
        //grabs element to change
        var studentOl = document.querySelector('#studentList');
        //clears out ol so that it always starts at 1, doesn't add on self
        studentOl.innerHTML = ""; 
        for (i = 0; i < classRoll.student.length; i++){
            //creates element within the specified querySelector
            var studentLi = document.createElement('li');
            //refers back to array
            var student = classRoll.student[i];
            //creates checkbox to call later in append
            var liCheckPresent = document.createElement('input');
            liCheckPresent.type = "checkbox";
            liCheckPresent.className = "present";
            var liCheckTarde = document.createElement('input');
            liCheckTarde.type = "checkbox";
            liCheckTarde.className = "tarde";
            //creates button to call later in append
            // var liPresentButton = document.createElement('button');
            // liPresentButton.innerHTML = "here";
            //creates span with name for after the button
            var liStudentNameSpan = document.createElement('p');
            liStudentNameSpan.innerText = classRoll.student[i].name;
            //assigns comments for each student
            var liAddEditCommentsInput = document.createElement('input');
            liAddEditCommentsInput.type = "text";
            liAddEditCommentsInput.className = 'addEditCommentsInput';
            //create a unique id for each input
            //liAddEditCommentsInput.id = "comment_" + i;
            if (student.comments === ""){
                liAddEditCommentsInput.placeholder = "Add/Edit Comments";
            }else{
                liAddEditCommentsInput.value = student.comments;
            }
            
            //adds id to each li element as the for loop iterates
            //this corresponds to it's position in the array
            studentLi.id = i;
            
            //li button to add comments
            //create image instead of button
            var liAddEditCommentsButton = document.createElement('button');
            //set src instead of text content
            liAddEditCommentsButton.textContent = "Add/Edit Comments";
            liAddEditCommentsButton.className = 'addEditComments';
            //create a unique id for each input
            //liAddEditCommentsButton.id = "button_" + i;
            //li button to delete student
            // var liDeleteStudentButton = document.createElement('button');
            // liDeleteStudentButton.textContent = "Delete Student";
            // liDeleteStudentButton.className = 'deleteButton';
            

            var studentPresent;
            if (student.present === true){
                liCheckPresent.checked = true;
            }else{
                liCheckPresent.checked = false;
            }

            if (student.tarde === true){
                liCheckTarde.checked = true;
            }else{
                liCheckTarde.checked = false;
            }





            
            //studentLi.textContent = classRoll.student[i].name;
            studentOl.appendChild(studentLi);
            //appends checkbox
            studentLi.appendChild(liCheckPresent);
            studentLi.appendChild(liCheckTarde);
            //appends button to Li
            //studentLi.appendChild(liPresentButton);
            studentLi.appendChild(liStudentNameSpan);
            studentLi.appendChild(liAddEditCommentsInput);
            studentLi.appendChild(liAddEditCommentsButton);
            //adds delete button
            studentLi.appendChild(this.createDeleteButton());
            //studentLi.appendChild(liDeleteStudentButton);
        }
    },
    // add delete button
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete Student";
        deleteButton.className = 'deleteButton';
        //don't know why yet
        return deleteButton;
    },
    setUpEventListeners: function(){
        //using parent element for eventlisteners to simplify
        //can be done on each individual element(more memory use)
        var studentsOl = document.querySelector('ol');

        //listens for clicks within the ol element
        //then runs the function
        //console.log to find target of event object(click)
        //find parentnode of target to detail event listeners
        studentsOl.addEventListener('click', function(event){
        //get the element that was clicked on
        var elementClicked = event.target;

        //checks if elementClicked is a delete button.
        if (elementClicked.className === 'deleteButton'){
            //run the function on the button click

            //parseInt turns the string into a number
            //number is required for handlers.fucntions
            //this is passed as the position value into handlers
            handlers.deleteStudent(parseInt(elementClicked.parentNode.id));
            }
        if (elementClicked.className === 'present'){
            handlers.togglePresent(parseInt(elementClicked.parentNode.id));
            }
        if (elementClicked.className === 'tarde'){
            handlers.toggleTarde(parseInt(elementClicked.parentNode.id));
            }
        if (elementClicked.className === 'addEditComments'){
            handlers.addEditComments(parseInt(elementClicked.parentNode.id));
        }
        // if (elementClicked.className === '')
        // ); 
        }
        )},       
    
//onkeypress for enter. need to add event listener    
};
//initialzes the eventlisteners
view.setUpEventListeners();

