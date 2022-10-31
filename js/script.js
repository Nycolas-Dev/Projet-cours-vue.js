import inventory from "./inventory.js";
import success from "./success.js";

new Vue({ 
    el: '#app', 
    components : { inventory, success },
    data(){
        return{
            listitems:[],
            listsuccess:[],
            step: null,
            previousStep: [],
            character: [
                {name: "Billy", strength: 60, stamina: 55, agility: 58, charisma: 15, intelligence: 12},
                {name: "Jeannot", strength: 50, stamina: 40, agility: 70, charisma: 15, intelligence: 25},
                {name: "Jacqueline", strength: 25, stamina: 35, agility: 60, charisma: 70, intelligence: 10},
                {name: "Martine", strength:35, stamina: 30, agility:45, charisma: 10, intelligence: 80},
                {name: "Apache, l'hélicoptère de combat", strength:100, stamina:100, agility:100, charisma:100, intelligence:100}
            ],
            currentCharacter:{},
            roll: 0,
            rollSuccess: false,
            stepUsedItems:[],
            footerDisplay: false,
        }
        
    },

    methods: {

        pickCharacter(x){
            this.currentCharacter = this.character[x];
        },
    
        sendChoice(x){
            this.previousStep.push(this.step);
            this.step = x;
            this.giveItem();
            this.giveSuccess();
            if(x===0){
                this.listitems.splice(0,this.listitems.length);
                this.previousStep.splice(0,this.previousStep.length);
                this.footerDisplay= true;
                this.displayFooter();
            }
            this.useItem(this.step);

            
            
        },
        goBack(){
            if (this.step == 0){
                this.step = null;
                this.previousStep.splice(0,this.previousStep.length);
                this.footerDisplay= true;
                this.displayFooter();
            }else{
                let lastStep =  this.previousStep.length-1;
                this.removeItem();
                this.step = this.previousStep[lastStep];
                this.previousStep.splice(lastStep,1);
                for(let i=0; i<this.stepUsedItems.length;i++){
                    if(this.step==this.stepUsedItems[i].step){
                        this.giveItem(this.stepUsedItems[i].name);
                        this.stepUsedItems.splice(i,1);
                    }
                }
            }
            
        },

        compareStat(x){
            this.roll = Math.floor(Math.random() * 100);
            if (this.roll < x){
                this.rollSuccess = true;
            }
            else{
                this.rollSuccess = false;
            }
        },
        
        giveItem(item){
            if(item==undefined){
                switch(this.step){
                    case 1.2:
                        this.listitems.push("Patate");
                        break;
                    case 2.1:
                        this.listitems.push("Sabre Laser");
                        break;
                }
            }else{
                this.listitems.push(item);
            }
            
        },

        giveSuccess(){
            switch(this.step){
                case 2.211:
                    if (this.listsuccess.indexOf("AMOUR POUR LA VIE") === -1) {
                        this.listsuccess.push("AMOUR POUR LA VIE");}
                    break;
                case 2.111:
                    if (this.listsuccess.indexOf("SOUS L'OCEAN") === -1) {
                        this.listsuccess.push("SOUS L'OCEAN");}
                    break;
                case 1.11111:
                    if (this.listsuccess.indexOf("SAUVER E.T") === -1) {
                        this.listsuccess.push("SAUVER E.T");}
                    break;
            }
            
                
            
        },

        removeItem(x){
            if(x==undefined){
                let lastitem = this.listitems[this.listitems.length-1];
                switch(this.step){
                    case 1.2:
                    case 2.1:
                        this.listitems.splice(lastitem,1);
                        break;
                }
            }else{
                for(let i = 0;i<this.listitems.length;i++){
                    if(x==this.listitems[i]){
                        this.stepUsedItems.push({name:x,step:this.previousStep[this.previousStep.length-1]});
                        this.listitems.splice(i,1);
                    }
                }
            }
        },

        useItem(step){
            switch(step){
                case 2.11:
                    this.removeItem("Sabre Laser");
                    break;
                case 12.1:
                    this.removeItem("Patate");
                    break;
            }
        },

        displayFooter(){
            let footer = document.getElementById("footer");
            
            if (this.footerDisplay == false){
                footer.style.display = "flex";
            }
            else {
                footer.style.display = "none";
            }
            this.footerDisplay = !this.footerDisplay;
        },

        checkItem(item){
            for(let i = 0;i<this.listitems.length;i++){
                if(item==this.listitems[i]){
                    return true;
                }
            }
            return false;
        }
    }
});