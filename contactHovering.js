import { LightningElement,track} from 'lwc';
import getConList from '@salesforce/apex/contactHovering.getConList';
import { NavigationMixin } from 'lightning/navigation';
export default class ContactHovering extends NavigationMixin(LightningElement) {
    searchKey;
    @track selectedRows=[];
    @track contacts;  
    @track error;
    @track isChecked=true;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    //This Funcation will get the value from Text Input.
    handelSearchKey(event){
        this.searchKey = event.target.value;
        console.log('this.searchKey>>>>>>'+this.searchKey);
    }
    //This funcation will fetch the Contacts on basis of searchkey
    SearchHandler(){
        getConList({conSearch: this.searchKey})   
        .then(result => {
                this.contacts = result;
                console.log('this.contacts>>>>>>>'+JSON.stringify(this.contacts));
        })
        .catch( error=>{
                this.contacts=error;
        });
    }
    handleRowSelection (event){
            const selectedRows = event.detail.selectedRows;
            for (let i = 0; i < selectedRows.length; i++){
                console.log("You selected: " + JSON.stringify(selectedRows[i]));
    }
       this.selectedRows= selectedRows;
       console.log('this.selectedRows>>>>'+JSON.stringify(this.selectedRows));

    }
    handleRemove(event) {
        console.log(' pill valuec------------>'+event.target.value);
        console.log(' pill valuec- before----------->'+JSON.stringify(this.selectedRows));
            event.preventDefault();
            let pillId = event.target.value;
            console.log('pillId>>>>'+pillId);
            this.selectedRows = this.selectedRows.filter(post => {
            this.selectedRows = this.selectedRows.filter(item => item.Id !== event.detail.value);
            return !pillId.includes(post.Id);
            })
            console.log(' pill valuec- before----------->'+JSON.stringify(this.selectedRows));
            console.log(' pill valuec after------------>'+JSON.stringify(this.selectedRows));
    }
    handleClick(event) {
       console.log('>>>>>>>');
       console.log('this.pillId',this.pillId);
       event.preventDefault();
       let pillId2 = event.target.value;
       console.log('pillId2>>>>'+pillId2);
       this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: pillId2 ,
            actionName: 'view'
        }
    });
    }
    cols = [
        {label:'Name', fieldName:'Name' , type:'text'} ,
        {label:'Phone', fieldName:'Phone' , type:'Phone'} ,
        {label:'Email', fieldName:'Email' , type:'email'}
    ];
    
}