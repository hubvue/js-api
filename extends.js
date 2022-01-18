const inhert = (function(){
      let F = function(){};
      return function(origin,target){
            F.prototype = origin.prototype;
            target.prototype = new F();
            target.prototype.constructor = target;
            return target;
      }
}())


function Person (){

}
Person.prototype.name = 'wang';

function Child () {

}
inhert(Person,Child);
const child = new Child();
const person = new Person();
console.log(child);
child.name = 'zhou';
console.log(person.name);