app.controller("TaskCtrl",["$scope","$rootScope","$location","angularFire","authService",function(e,t,n,r,i){var s=n.path();e.list=s.split("-",1).toString().replace(/[^\w\s]/gi,"");var o=new Firebase("https://listify.firebaseio.com/lists/"+s+"/incomplete");e.tasks=[];r(o,e,"tasks");var u=new Firebase("https://listify.firebaseio.com/lists/"+s+"/completed");e.completedTasks=[];r(u,e,"completedTasks");t.$on("login",function(t,n){var i=new Firebase("https://listify.firebaseio.com/lists/"+s+"/users/"),o=new Date;console.log(o);e.users=[];e.users.push({user:n.uid,timestamp:o.toString()});r(i,e,"users")});e.addTask=function(t){var n=t.keyCode||t.char,r=t.target||t.srcElement,i={};if(n!=13||/^ *$/.test(r.value))return;i.value=e.todo;i.time=new Date;i.id=(new Date).getUTCMilliseconds()+Math.floor(Math.random()*10);e.tasks.push({task:i.value,id:i.id,time:i.time.toString()});e.todo=""};e.completeTask=function(t){e.tasks.splice(t,1);e.completedTasks.push(this.task)};e.undoComplete=function(t){e.completedTasks.splice(t,1);e.tasks.push(this.completedTask)};e.removeTask=function(t){e.tasks.splice(t,1)};e.removeCompletedTask=function(t){e.completedTasks.splice(t,1)};e.clearCompletedTasks=function(t){t.preventDefault();e.completedTasks=[]}}]);