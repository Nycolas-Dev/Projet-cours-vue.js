export default Vue.component('inventory',{
    template: `
    <div class="parents">
        <h3>Inventaire :</h3>
        <ul class="inventory">
            <li v-for="item in list">{{item}}</li>
        </ul>
    </div>
    `,

    props:{
        list: Array
    } ,
    data(){
        return {};
    }
})