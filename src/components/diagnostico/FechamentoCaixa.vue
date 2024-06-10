<template>
 <header class='container mx-auto flex h-20 items-center justify-between px-4'>
      <h1 class='text-2xl font-bold text-black md:text-3xl lg:text-4xl'>
        Diagnóstico DouraSoft - <span class='text-[#176BEF]' >{{ this.nomeLoterica }}</span>
      </h1>
      <img
        src='https://dourasoft.com.br/wp-content/uploads/2023/04/logo-doura-soft-1.png.webp'
        alt='Logo DouraSoft'
      />
    </header>
    
    <div class='flex flex-row'>
      <div class='relative col-span-12 bg-[#176bef] pb-20 pt-5 md:col-span-6 lg:pb-0 lg:pt-8 xl:col-span-3'>
        <section class='flex flex-col items-center justify-center'>
          <form class='flex flex-col gap-y-8 px-4'>
            <Input :v-model='tflQuantity' title='Quantidade TFL' v-model="tflQuantity" :op1='true'/>
            <Input :v-model='tflTime' title='Tempo para fechar UM TFL' v-model="tflTime" :op='true'/>
            <Input :v-model='spreadsheetTime' title='Tempo para lançar todos os caixas na planilha' v-model="spreadsheetTime"  :op='true'/>
            <Input :v-model='checkTime' title='Tempo para conferir todos os caixas' :op='true' v-model="checkTime"  />
            <Input :v-model='operatorSalary' title='Salário Operador' v-model="operatorSalary"  :op='false'/>
            <Input :v-model='managerSalary' title='Salário Gerente' v-model="managerSalary"  :op='false'/>
            <Input :v-model='lotericoSalary' title='Pró-Labore Lotérico' v-model="lotericoSalary"  :op='false'/>
          </form>
        </section>
      </div>
   


      <div class='col-span-12 bg-[#176BEF] md:col-span-6 xl:col-span-4 2xl:col-span-3'>
        <div class='bg-[#F9B500] py-6 lg:py-2 border-b border-gray '>
          <section class='mx-auto flex flex-col items-start justify-center px-2'>
            <div class='relative mb-2 flex  items-center justify-between'>
              <h1 class='text-xl font-bold text-white'>Custo</h1>
            </div>
            
            <div class=' flex-row w-45 justify-center '>
              <div class='flex flex-col gap-1.5'>

                  <div class='text-center flex  pl-[30%]'>
                    <p class='mb-1.5' >Operador</p>   
                    <p class='mb-1.5 pl-12' >Gerente</p>    
                    <p class='mb-1.5 pl-14' >Lotérico</p>         
                  </div>

                    <div class='text-center flex gap-3'>                
                        <h5 class='pr-[60px]'>Salário</h5>
                        <Resultado :value='salario(operatorSalary)' />
                        <Resultado :value='salario(managerSalary)' />
                        <Resultado :value='salario(lotericoSalary)' />
                    </div>
                    <div class='text-center flex gap-3'>                
                        <h5>Tributos (60%)</h5>
                        <Resultado :value='tributos(operatorSalary)' />
                        <Resultado :value='tributos(managerSalary)' />
                        <Resultado :value='0' :semMarca_Centro='true'/>
                    </div>
                    <div class='text-center flex gap-3'>                
                        <h5 class='pr-[23px]'>Custo Total</h5>
                        <Resultado :value='inteiro(operatorSalary)' />                        
                        <Resultado :value='inteiro(managerSalary)' />
                        <Resultado :value='0' :semMarca_Centro='true'/>
                    </div>
                    <div class='text-center flex gap-3'>                
                        <h5>Horas por Mês</h5>
                        <Resultado :value=189 :Hrs='true' :semMarca_Centro='true'/>
                        <Resultado :value=189 :Hrs='true' :semMarca_Centro='true'/>
                        <Resultado :value=189 :Hrs='true' :semMarca_Centro='true'/>
                    </div>
                    <div class='text-center flex gap-3'>                
                        <h5 class='pr-2'>Minutos Hora</h5>
                        <Resultado :value='60' :Min='true' :semMarca_Centro='true'/>
                        <Resultado :value='60' :Min='true' :semMarca_Centro='true'/>
                        <Resultado :value='60' :Min='true' :semMarca_Centro='true'/>
                    </div>
                    <div class='text-center flex gap-3'>                
                        <h5 class='pr-6'>Custo Hora</h5>
                        <Resultado :value='horas(operatorSalary)'/>
                        <Resultado :value='horas(managerSalary)'/>
                        <Resultado :value='(loterico(lotericoSalary)/189).toFixed(2)'/>
                    </div>
                    <div class='text-center flex gap-3'>                
                        <h5 class='pr-2'>Custo Minuto</h5>
                        <Resultado :value='minutos(operatorSalary).toFixed(2)'/>
                        <Resultado :value='minutos(managerSalary).toFixed(2)'/>
                        <Resultado :value='((loterico(lotericoSalary)/189)/60).toFixed(2)'/>
                    </div>
                </div>            
        
            </div>
          </section>
    </div>

    <div class='col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3'>
      <div class='accordion'>
        <div class='accordion-item border-none'>
          <div class='accordion-title cursor-pointer flex justify-between bg-[#FF3E30]' @click='toggleAccordion'>
            <h1 class='text-xl px-2 font-bold text-white'>Fechamentos de Caixas</h1>
            <p class='text-2xl mr-4 font-bold'>+</p>
          </div>

        </div>
      </div>





      <!--PRIMEIRA PARTE -->
        <div class='bg-[#FF3E30]  border-b border-gray'>
          <section class='mx-auto flex flex-col items-start justify-center px-2'>
   
            <div class=' flex-row w-45 justify-center '>
              <div class='flex flex-col gap-2'>
                  <div class='text-center flex gap-4 pl-[28%]'>
                    <p class='mb-1.5  whitespace-nowrap' >Sem Sistema</p>   
                    <p class='mb-1.5 whitespace-nowrap' >Com Sistema</p>    
                    <p class='mb-1.5 pl-5' >Prejuízo</p>                      
                                        
                  </div>
                  <div class='text-center flex gap-3 items-center justify-center'>
                    <h5 class='text-xs font-semibold'>Quantidade Caixas</h5>  
                    <Resultado :value='tflQuantity' :semMarca_Centro='true'/> 
                    <Resultado :value='tflQuantity' :semMarca_Centro='true'/>
                    <Resultado :value='tflQuantity' :semMarca_Centro='true'/>
                  </div>     
                  <div class='text-center flex gap-3 items-center justify-center'>
                    <p class='text-xs font-semibold  mx-5 '>Fechamento <br>por Caixa</p>  
                    <Resultado :value='tflTime' :semMarca_Centro='true' :Min='true' />                    
                    <Resultado :value='5' :semMarca_Centro='true' :Min='true'/>
                    <Resultado :value='parseInt(tflTime) -5 ' :semMarca_Centro='true' :Min='true'/>
                  </div>                   
                  <div class='text-center flex gap-3 pb-3 items-center justify-center'>
                    <p class='text-xs font-semibold  mr-3 '>Tempo Total/Dia</p>  
                    <Resultado :value='parseInt(tflQuantity)*parseInt(tflTime)' :semMarca_Centro='true' :Min='true'/>                  
                    <Resultado :value='parseInt(tflQuantity)*5' :semMarca_Centro='true' :Min='true'/>
                    <Resultado :value='parseInt(tflQuantity) * parseInt(tflTime) - (parseInt(tflQuantity) * 5)' :semMarca_Centro='true' :Min='true'/>
                  </div>     
                    <hr>

            

          


                  <div  v-if='isOpen'>
                                
                    

                    <div class='text-center flex gap-3  mb-1  items-center justify-center'>                      
                      <p class='text-xs font-semibold mr-5 '>Custo por<br>Operador dia</p>      
                      <Resultado :value='((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(operatorSalary)).toFixed(2)' />
                      <Resultado :value='((parseFloat(tflQuantity)*5) * minutos(operatorSalary)).toFixed(2)' />
                      <Resultado :value='(((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(operatorSalary)) - ((parseFloat(tflQuantity)*5) * minutos(operatorSalary))).toFixed(2)' />
                  </div> 

                  <div class='text-center flex gap-3  mb-1  items-center justify-center'>                      
                    <p class='text-[11px] font-semibold   '>Custo por<br>Operador Semanal</p>      
                    <Resultado :value='(((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(operatorSalary))*6).toFixed(2)' />
                    <Resultado :value='(((parseFloat(tflQuantity)*5) * minutos(operatorSalary))*6).toFixed(2)' />
                    <Resultado :value='((((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(operatorSalary))*6)-(((parseFloat(tflQuantity)*5) * minutos(operatorSalary))*6)).toFixed(2)' />
                  </div> 

                  <div class='text-center flex gap-3  mb-1  items-center justify-center'>                      
                    <p class='text-xs font-semibold   '>Custo por<br>Operador Mensal</p>      
                    <Resultado :value='(((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(operatorSalary))*26).toFixed(2)'  /> 
                    <Resultado :value='(((parseFloat(tflQuantity)*5) * minutos(operatorSalary))*26).toFixed(2)'  /> 
                    <Resultado :value='((((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(operatorSalary))*26)-(((parseFloat(tflQuantity)*5) * minutos(operatorSalary))*26)).toFixed(2)'  /> 
                  </div> 
                    <hr>
                    <div class='text-center flex gap-3  mb-1  items-center justify-center'>                      
                      <p class='text-xs font-semibold  '>Custo por Gerente<br>dia</p>   
                      <Resultado :value='((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(managerSalary)).toFixed(2)' />
                      <Resultado :value='((parseFloat(tflQuantity)*5) * minutos(managerSalary)).toFixed(2)' />
                      <Resultado :value='(((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(managerSalary))-((parseFloat(tflQuantity)*5) * minutos(managerSalary))).toFixed(2)' />
                  </div>    

                  <div class='text-center flex gap-3  mb-1  items-center justify-center'>                      
                      <p class='text-xs font-semibold  '>Custo por Gerente<br>Semanal</p>   
                      <Resultado :value='(((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(managerSalary))*6).toFixed(2)' />
                      <Resultado :value='(((parseFloat(tflQuantity)*5) * minutos(managerSalary))*6).toFixed(2)' />
                      <Resultado :value='((((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(managerSalary))*6) - (((parseFloat(tflQuantity)*5) * minutos(managerSalary))*6)).toFixed(2)' />
                  </div>     
                  <div class='text-center flex gap-3  mb-1  items-center justify-center'>                      
                    <p class='text-xs font-semibold   '>Custo por Gerente<br>Mensal</p> 
                    <Resultado :value='(((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(managerSalary))*26).toFixed(2)'  /> 
                    <Resultado :value='(((parseFloat(tflQuantity)*5) * minutos(managerSalary))*26).toFixed(2)'  /> 
                    <Resultado :value='((((parseFloat(tflQuantity)*parseFloat(tflTime)) * minutos(managerSalary))*26) - (((parseFloat(tflQuantity)*5) * minutos(managerSalary))*26)).toFixed(2)'  /> 
                  </div>     
                  <hr>
                  <div class='text-center flex gap-3  mb-1  items-center justify-center'>                      
                    <p class='text-xs font-semibold   '>Custo por Lotérico<br>dia</p>   
                  <Resultado :value='((parseFloat(tflQuantity)*parseFloat(tflTime)) * ((loterico(lotericoSalary)/189)/60)).toFixed(2)' />
                  <Resultado :value='((parseFloat(tflQuantity)*5) * ((loterico(lotericoSalary)/189)/60)).toFixed(2)' />
                  <Resultado :value='(((parseFloat(tflQuantity)*parseFloat(tflTime)) * ((loterico(lotericoSalary)/189)/60)) -  ((parseFloat(tflQuantity)*5) * ((loterico(lotericoSalary)/189)/60))).toFixed(2)' />
                  </div>     
                  <div class='text-center flex gap-3  mb-1  items-center justify-center'>               
                    <p class='text-xs font-semibold   '>Custo por Lotérico<br>Semanal</p>  
                    <Resultado :value='(((parseFloat(tflQuantity)*parseFloat(tflTime)) * ((loterico(lotericoSalary)/189)/60))*6).toFixed(2)' />
                    <Resultado :value='(((parseFloat(tflQuantity)*5) * ((loterico(lotericoSalary)/189)/60))*6).toFixed(2)' />
                    <Resultado :value='((((parseFloat(tflQuantity)*parseFloat(tflTime)) * ((loterico(lotericoSalary)/189)/60))*6)  - (((parseFloat(tflQuantity)*5) * ((loterico(lotericoSalary)/189)/60))*6)).toFixed(2)' />
                  </div>     
                  <div class='text-center flex gap-3  mb-1  items-center justify-center'>                      
                    <p class='text-xs font-semibold   '>Custo por Lotérico<br>Mensal</p> 
                    <Resultado :value='(((parseFloat(tflQuantity)*parseFloat(tflTime)) * ((loterico(lotericoSalary)/189)/60))*26).toFixed(2)'  /> 
                    <Resultado :value='(((parseFloat(tflQuantity)*5) * ((loterico(lotericoSalary)/189)/60))*26).toFixed(2)'  />
                    <Resultado :value='((((parseFloat(tflQuantity)*parseFloat(tflTime)) * ((loterico(lotericoSalary)/189)/60))*26) - (((parseFloat(tflQuantity)*5) * ((loterico(lotericoSalary)/189)/60))*26)).toFixed(2)' />
                  </div>     
            </div> 
        </div> 

            </div>            
          </section>
        </div>


        <div class='bg-[#337C24] rounded-b-2xl'>
          <section class='mx-auto flex flex-col items-start justify-center px-8'>
            <div class='relative mb-2 flex justify-between w-full'>
              <h1 class='text-xl font-bold text-white'>Desperdício de Tempo e Dinheiro por Mês </h1>
                <img :src="'https://veja.dourasoft.com.br/wp-content/uploads/2024/06/' + (isOpenDiagnostico ? 'open' : 'closed') + '.png'" class='w-5 h-5 mt-2' @click='isOpenDiagnostico = !isOpenDiagnostico'>
            </div>
            <div class='flex flex-col gap-3 w-full'>
                <div class='flex gap-3 justify-between  w-full'>
                    <div class='w-full text-center'>
                        <label for='countries1' class='block text-lg font-bold text-white'>Caixas</label>
                        <p class='text-base font-bold text-white'>{{parseInt(tflQuantity) * parseInt(tflTime) - (parseInt(tflQuantity) * 5)}} Min</p>
                        <select id='countries1' v-model='selectedValues[0]' class='bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-1' @change=handleSelectChange>
                            <option value='Operador' selected>Operador</option>
                            <option value='Gerente'>Gerente</option>
                            <option value='Lotérico'>Lotérico</option>
                        </select>
                    </div>

                    <div class='w-full text-center'>
                        <label for='countries2' class='block text-lg font-bold text-white'>Planilha</label>
                        <p class='text-base font-bold text-white'>{{spreadsheetTime}}</p>
                        <select id='countries1' v-model='selectedValues[1]' class='bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-1' @change=handleSelectChange>
                            <option value='Gerente' selected>Gerente</option>
                            <option value='Lotérico'>Lotérico</option>
                        </select>
                    </div>

                    <div class='w-full text-center'>
                        <label for='countries3' class='block text-lg font-bold text-white'>Conferência</label>
                        <p class='text-base font-bold text-white'>{{checkTime}}</p>
                        <select id='countries1' v-model='selectedValues[2]' class='bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-1' @change=handleSelectChange>
                            <option value='Gerente' selected>Gerente</option>
                            <option value='Lotérico'>Lotérico</option>
                        </select>
                    </div>
                    <div class='flex items-end text-center w-full'>

                        <p class='text-[13px] ml-5 block font-bold text-white'>Desperdício Mensal</p>

                    </div>
                </div>            
                <div class='flex gap-1 pb-3 justify-between'>
                    <Resultado :value='caixas(selectedValues[0])' />
                    <Resultado :value='planilha(selectedValues[1])' />
                    <Resultado :value='conferencia(selectedValues[2])' />
                    <Resultado :value='tudo()' />
                </div>
                            
            </div>
            
          </section>
        </div>





</div>
    </div>
    <div class='col-span-12 bg-[] rounded-b-2xl md:col-span-6 xl:col-span-4 2xl:col-span-3 pl-13' :class="{ 'text-black': isOpenDiagnostico, 'text-transparent': !isOpenDiagnostico }">
    <section class='mx-auto flex flex-col items-start justify-center p-3 text-center w-full' >
        <div class='w-full text-center'>
            <h1 class='text-xl font-bold'>Diagnóstico</h1> 
        </div>
        <div>
            <h1>{{tituloTexto()}}</h1>
            <h2>{{corpoTexto()}}</h2>
        </div>
    </section>
</div>
</div>


</template>

<script>
import Resultado from './componentes/Resultado.vue'
import Input from './componentes/Input.vue'

export default{
    name:"FechamentoCaixa",
    props: {
    nomeLoterica:{
      type: String,
    },
    
    tflQuantity1: {
      type: String,
      required: true
    },
    tflTime1: {
      type: String,
      required1: true
    },
    spreadsheetTime1: {
      type: String,
      required: true
    },
    checkTime1: {
        type: String,

      required: true
    },
    operatorSalary1: {
     type: String,
      required: true
    },
    managerSalary1: {      
      type: String,
      required: true
    },
    lotericoSalary1: {
      type: String,
      required: true
    }
  },
    components: {Resultado, Input},
    data(){return {
      lotericoSalary: this.$props.lotericoSalary1,
      managerSalary: this.$props.managerSalary1,
      operatorSalary: this.$props.operatorSalary1,
      checkTime: this.$props.checkTime1,
      spreadsheetTime: this.$props.spreadsheetTime1,
      tflTime: this.$props.tflTime1,
      tflQuantity: this.$props.tflQuantity1,
      firstRow: ['Operador','Gerente','Lotérico'],
      secondRow: ['Salário','<Resultado :value=operatorSalary />','<Resultado :value=managerSalary />','<Resultado :value=lotericoSalary/>'],
      thirdtRow: ['Tributos (60%)','<Resultado :value=tributos(operatorSalary) />','Resultado :value=tributos(managerSalary) />','<Resultado :value=0 :semMarca_Centro=true/>'],
      fourtdRow: ['Custo Total','<Resultado :value=inteiro(operatorSalary) />','<Resultado :value=inteiro(managerSalary) />','<Resultado :value=0 :semMarca_Centro=true/>'],
      fifthRow: ['Horas por Mês','<Resultado :value=189 :Hrs=true :semMarca_Centro=true/>','<Resultado :value=189 :Hrs=true :semMarca_Centro=true/>','<Resultado :value=189 :Hrs=true :semMarca_Centro=true/>'],
      sixtydRow: ['Minutos Hora',' <Resultado :value=60 :Min=true :semMarca_Centro=true/>',' <Resultado :value=60 :Min=true :semMarca_Centro=true/>',' <Resultado :value=60 :Min=true :semMarca_Centro=true/>'],
      seventhRow: ['Custo Hora','<Resultado :value=horas(operatorSalary)/>','<Resultado :value=horas(managerSalary)/>','<Resultado :value=(loterico(lotericoSalary)/189).toFixed(2)/>'],
      eightRow:  ['Custo Minuto','  <Resultado :value=minutos(operatorSalary).toFixed(2)/>',' <Resultado :value=minutos(managerSalary).toFixed(2)/>','<Resultado :value=((loterico(lotericoSalary)/189)/60).toFixed(2)/>'],

      selectedValues: ['Operador', 'Gerente', 'Lotérico'],
      tabela1: ['Salário','Tributos (60%)','Custo Total','Horas por Mês','Minutos Hora','Custo hora','Custo Minuto'],
      isOpen : false,
      isOpenDiagnostico:false,
      tabela3: ['Custo por <br/>Operador/Dia','Custo por <br/>Operador/Semana','Custo por <br/>Operador/Mensal<p><p/><hr/>','Custo por <br/>Gerente/Dia','Custo por <br/>Gerente/Semana','Custo por <br/>Gerente/Mensal<p/><hr/>','Custo por <br/>Lotérico/Dia','Custo por <br/>Lotérico/Semana','Custo por <br/>Lotérico/Mensal'],

    }}
  ,
  methods:{
    salario(string){
      let newString =''
      newString = string.replace(/R\$/g, '').trim();

      return newString
    },

    tributos(value){
      let newString = '';
      newString = value.replace(/R\$/g, '').trim();
      return (parseFloat(newString)*0.6).toFixed(2).replace(".", ",");
    },
    inteiro(value){
        value = value.replace(',', '.')
        let newString = '';
        newString = value.replace(/R\$/g, '').trim();
        return (parseFloat(newString) + parseFloat(this.tributos(newString))).toFixed(2)
    },
    horas(value){
        value = value.replace(',', '.')
        let newString = '';
        newString = value.replace(/R\$/g, '').trim();
        return (this.inteiro(newString)/189).toFixed(2)
    },
    minutos(value){
      let newString = '';
      newString = value.replace(',', '.')
      newString = value.replace(/R\$/g, '').trim();
      return parseFloat(this.horas(newString)/60)
    },
    loterico(value){
      let newString = '';
      newString = value.replace(',', '.')
      newString = value.replace(/R\$/g, '').trim();
      return parseFloat(newString)
    },
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },   
    tudo(){
        return ( Number(this.caixas(this.selectedValues[0])) + Number(this.planilha(this.selectedValues[1])) +  Number(this.conferencia(this.selectedValues[2]))).toFixed(2);     
    },
    caixas(id){
        switch(id){
            case 'Operador':
               return ((parseInt(this.tflQuantity) * parseInt(this.tflTime) - (parseInt(this.tflQuantity) * 5))*26*(this.minutos(this.operatorSalary))).toFixed(2)
            case 'Gerente':
                return ((parseInt(this.tflQuantity) * parseInt(this.tflTime) - (parseInt(this.tflQuantity) * 5))*26*(this.minutos(this.managerSalary))).toFixed(2)
            case 'Lotérico':
                return ((parseInt(this.tflQuantity) * parseInt(this.tflTime) - (parseInt(this.tflQuantity) * 5))*26*((this.loterico)(this.lotericoSalary)/189)/60).toFixed(2)
        }
        
    },
    planilha(id){
        switch(id){
            case 'Gerente':
                return (parseInt(this.spreadsheetTime)*26*(this.minutos(this.managerSalary))).toFixed(2)
            case 'Lotérico':
                return (parseInt(this.spreadsheetTime)*26*((this.loterico)(this.lotericoSalary)/189)/60).toFixed(2)
        }
    },
    conferencia(id){
        switch(id){
            case 'Gerente':
                return (parseInt(this.checkTime)*26*(this.minutos(this.managerSalary))).toFixed(2)
            case 'Lotérico':
                return (parseInt(this.checkTime)*26*((this.loterico)(this.lotericoSalary)/189)/60).toFixed(2)
        }
    },
    tituloTexto() {
  if (this.selectedValues[0] === 'Operador' && this.selectedValues[1] === 'Gerente' && this.selectedValues[2] === 'Lotérico') {
    return 'Padrão!';
  }
  if (this.selectedValues[0] === 'Gerente' && this.selectedValues[1] === 'Gerente' && this.selectedValues[2] === 'Lotérico') {
    return 'Gerente fazendo quase tudo!';
  }
  if (this.selectedValues[0] === 'Operador' && this.selectedValues[1] === 'Lotérico' && this.selectedValues[2] === 'Lotérico') {
    return 'Lotérico fazendo quase tudo!';
  }
  if (this.selectedValues[0] === 'Gerente' && this.selectedValues[1] === 'Gerente' && this.selectedValues[2] === 'Gerente') {
    return 'Gerente fazendo tudo!';
  }
  if (this.selectedValues[0] === 'Gerente' && this.selectedValues[1] === 'Gerente' && this.selectedValues[2] === 'Lotérico') {
    return 'Seu gerente quase faz tudo!';
  }
  if (this.selectedValues[0] === 'Gerente' && this.selectedValues[1] === 'Lotérico' && this.selectedValues[2] === 'Lotérico') {
    return 'Lotérico quase faz tudo!';
  }
  if (this.selectedValues[0] === 'Lotérico' && this.selectedValues[1] === 'Lotérico' && this.selectedValues[2] === 'Lotérico') {
    return 'Lotérico faz tudo!';
  }
  return 'Inválido, essa sequencia não é válida, por favor insira texto'
},

corpoTexto() {
  if (this.selectedValues[0] === 'Operador' && this.selectedValues[1] === 'Gerente' && this.selectedValues[2] === 'Lotérico') {
    return 'Operador Caixa - gerente planilha - Lotérico - Conferencia';
  }
  if (this.selectedValues[0] === 'Operador' && this.selectedValues[1] === 'Lotérico' && this.selectedValues[2] === 'Lotérico') {
    return 'Operador Caixa - Lotérico planilha - Lotérico - Conferencia';
  }  
  if (this.selectedValues[0] === 'Operador' && this.selectedValues[1] === 'Gerente' && this.selectedValues[2] === 'Gerente') {
    return 'Operador Caixa - Lotérico planilha - Lotérico - Conferencia';
  }
  if (this.selectedValues[0] === 'Gerente' && this.selectedValues[1] === 'Gerente' && this.selectedValues[2] === 'Gerente') {
    return 'Gerente Caixa - Gerente planilha - Gerente - Conferencia';
  }
  if (this.selectedValues[0] === 'Gerente' && this.selectedValues[1] === 'Gerente' && this.selectedValues[2] === 'Lotérico') {
    return 'Gerente Caixa - Gerente planilha - Lotérico - Conferencia';
  }
  if (this.selectedValues[0] === 'Gerente' && this.selectedValues[1] === 'Lotérico' && this.selectedValues[2] === 'Lotérico') {
    return 'Gerente Caixa - Lotérico planilha - Lotérico - Conferencia';
  }
  if (this.selectedValues[0] === 'Lotérico' && this.selectedValues[1] === 'Lotérico' && this.selectedValues[2] === 'Lotérico') {
    return 'Lotérico Caixa - Lotérico planilha - Lotérico - Conferencia';
  }  
  return 'Inválido, essa sequencia não é válida, por favor insira texto'


}

  ,
  watch: {
    tflQuantity(newValue) {
      this.$root.tflQuantity = newValue;
    },
    tflTime(newValue) {
      this.$root.tflTime = newValue;
    },
    spreadsheetTime(newValue) {
      this.$root.spreadsheetTime = newValue;
    },
    checkTime(newValue) {
      this.$root.checkTime = newValue;
    },
    operatorSalary(newValue) {
      this.$root.operatorSalary = newValue;
    },
    managerSalary(newValue) {
      this.$root.managerSalary = newValue;
    },
    proLabore(newValue) {
      this.$root.lotericoSalary = newValue;
    }
}
}}
</script>