const ProjectModule = (function() {
    return {
        getInstance() {
            return {
                participants: [],
                pricing: { },
                isBusy: false,
            
                init(participants, pricing) {
                    if (Array.isArray(participants) && participants.every((item) => item.hasOwnProperty('seniorityLevel'))) {
                        this.participants = participants;
                    }
                    if (typeof pricing === 'object') {
                        this.pricing = pricing;
                    }
                 },
            
                findParticipant(functor, callbackFunction) {
                    // if (this.isBusy) {
                    //     return false;
                    // }         
                    setTimeout(() => {
                        this.isBusy = false;
                        const participant = this.participants.find(functor) || null;
                        if (typeof callbackFunction === 'function') {
                            callbackFunction(participant);
                        }
                    });
                    this.isBusy = true;
                },
            
                findParticipants(functor, callbackFunction) { 
                    // if (this.isBusy) {
                    //     return false;
                    // } 
                    setTimeout(() => {
                        this.isBusy = false;
                        const participants = this.participants.filter(functor);
                        if (typeof callbackFunction === 'function') {
                            callbackFunction(participants);
                        }
                    });
                    this.isBusy = true;        
                },
            
                addParticipant(participantObject, callbackFunction) { 
                    // if (this.isBusy) {
                    //     return false;
                    // }
                    setTimeout(() => {
                        this.isBusy = false;
                        let err;
                        if (participantObject.hasOwnProperty('seniorityLevel')){
                            this.participants.push(participantObject);              
                        } else {
                            err = 'Wrong Participant';
                        }
                        if (typeof callbackFunction === 'function') {
                            callbackFunction(err);
                        }
                    });
                    this.isBusy = true;       
                },
            
                removeParticipant(participantObject, callbackFunction) { 
                    // if (this.isBusy) {
                    //     return false;
                    // } 
                    setTimeout(() => {
                        const index = this.participants.findIndex((item) => item === participantObject);
                        const removinObj = index != -1 ? this.participants.splice(index, 1)[0] : null;      
                        this.isBusy = false;
                        if (typeof callbackFunction === 'function') {            
                            callbackFunction(removinObj);
                        }
                    });
                    this.isBusy = true;
                },
            
                setPricing(participantPriceObject, callbackFunction) {
                    // if (this.isBusy) {
                    //     return false;
                    // } 
                    setTimeout(() => {
                        this.isBusy = false;  
                        let isPricing = false;
                        
                        for (let key in this.pricing) {
                            if (participantPriceObject.hasOwnProperty(key)) {
                                this.pricing[key] = participantPriceObject[key];
                                isPricing = true;
                            }
                        }
                        if (!isPricing) {
                            this.pricing = Object.assign(this.pricing, participantPriceObject);
                        }
                        if (typeof callbackFunction === 'function') {
                            callbackFunction();
                        }
                    }); 
                    this.isBusy = true; 
                 },
            
                calculateSalary(periodInDays) {
                    if (!isNaN(parseFloat(periodInDays)) && isFinite(periodInDays)) {
                        let sumSalary = this.participants.reduce((sum, item) => {
                            const salary = this.pricing[item.seniorityLevel];
                            if (!isNaN(parseFloat(salary)) && isFinite(salary)) {
                                return sum + salary;
                            } else {
                                throw new Error('Pricing does not exist');
                            }            
                        }, 0);
                        return sumSalary * periodInDays * 8;
                    } else {
                        throw new Error('Argument is not a number');     
                    }        
                }
            }
        }
    }
})();

module.exports = {
    firstName: 'Andrey',
    lastName: 'Turik',
    task: ProjectModule.getInstance()
}
