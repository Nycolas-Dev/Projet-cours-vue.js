export default Vue.component('success',{
    template: `
    <div class="parents">
        <h3>Succès:</h3>
        <ul class="success">
            <li v-for="succes in listsuc">{{succes}}</li>
        </ul>
    </div>
    `,

    props:{
        listsuc: Array
    } ,
    data(){
        return {};
    }
})