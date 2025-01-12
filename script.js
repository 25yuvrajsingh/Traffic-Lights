document.addEventListener('DOMContentLoaded', function () {

    //       Getting all of the elements 

    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const sequenceInput = document.getElementById('sequence');
    const greenInput = document.getElementById('greenInterval');
    const yellowInput = document.getElementById('yellowInterval');

    const signals = {

        A: document.getElementById('signalA'),
        B: document.getElementById('signalB'),
        C: document.getElementById('signalC'),
        D: document.getElementById('signalD')

    };

    //  Validating the function for seequence

    function validateInputs() {

        sequence = sequenceInput.value.split(',');
        greenInterval = parseInt(greenInput.value) * 1000; 
        yellowInterval = parseInt(yellowInput.value) * 1000;

        if (!sequence.every(sig => ['A', 'B', 'C', 'D'].includes(sig))) {
            alert('Invalid sequence. Please use A, B, C, D.');
            return false;
        }
       
        return true;   
    }

    // Start the signol

    function startSignals() {

        if ( !validateInputs() ) 
          return;

        let currentSignalIndex = 0 ;

        function changeSignal() {

            // By default all signals are RED

            Object.keys(signals).forEach (sig => signals[sig].className = 'signal red') ;
            
           // for green
            let  currentSignal = sequence[currentSignalIndex];
            signals[currentSignal].className = 'signal green' ;

            // for yellow
            setTimeout(() => {
                signals[currentSignal].className = 'signal yellow';
            }, greenInterval - yellowInterval);

            // Move to the next signal
            currentSignalIndex = (currentSignalIndex + 1)  % sequence.length ; 
        }

        // Start the interval loop
        intervalId = setInterval(changeSignal, greenInterval);
        changeSignal();  
    }

    // Stop the signal 

    function stopSignals() {

        if (intervalId) {

            clearInterval(intervalId);
            intervalId = null;

            // Reset all the signals to the red

            Object.keys(signals).forEach(sig => signals[sig].className = 'signal red');
        }
    }

    startButton.addEventListener('click', startSignals);
    stopButton.addEventListener('click', stopSignals);

}

);
