//find the missing number in   1,2, ?,4,5,?,7,8,?,0

var incompleteNumber = [1,2,'x',4,5,'y',7,8,'z',0]

function findMissingNumber(allnumber){
    totalExpectedNumber = 10;
    expectedArray = [1,2,3,4,5,6,7,8,9,0];

    arrayOfNumbers = incompleteNumber;

        console.log('missing:');

        for(var i=0; i<totalExpectedNumber; i++){
            if( arrayOfNumbers[i] != expectedArray[i]){
                console.log(arrayOfNumbers[i]);
            }
        }

}

findMissingNumber(incompleteNumber);

