const Console = function() {};
Console.prototype.log = function(d) {
    process.stdout.write(d + "\n");
};

const myConsole = new Console(); 
myConsole.log("ASd");