<template>
  <LoadingCircle v-if="loading" />

  <div>
    <TitleView title="Revisões" />
  </div>
  <div>
    <div class="flex justify-center w-full mt-10">
      <button
        type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        @click="openUserModal"
        :disabled="loading"
      >
        Adicionar Revisão
      </button>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        @click="openFilterModal"
        :disabled="loading"
      >
        Aplicar Filtros
      </button>
      <button
        type="button"
        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        @click="openChardModal"
        :disabled="loading"
      >
        Visualizar Gráficos
      </button>
    </div>
  </div>
  <div class="flex justify-center max-h-[420px]">
    <TableView
      :headers="headers"
      :body="services"
      @showDetails="showDetails"
  
    />
  </div>

  <div
    id="default-modal"
    :class="{ hidden: openModal }"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
        >
          <div v-if="modalFilter">
            <h3 class="text-xl font-semibold text-gray-900">Aplicar Filtros</h3>
          </div>
          <div v-if="modalUser">
            <h3 class="text-xl font-semibold text-gray-900">
              Criar Revisão
            </h3>
          </div>
          <div v-if="modalUpdate">
            <h3 class="text-xl font-semibold text-gray-900">
              Alterar {{ modalContent.carName }}
            </h3>
          </div>
          <div v-if="modalChart">
            <h3 class="text-xl font-semibold text-gray-900">
              Visualizar Gráficos
            </h3>
            <div class="flex gap-2">
              Aplicar Gráficos:
              <div>
                <input
                  v-model="allChecked"
                  @change="toggleCheckbox('allChecked')"
                  type="checkbox"
                  value=""
                  :disabled="allChecked"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label class="ms-2 text-sm font-medium">Todos</label>
              </div>
              <div>
                <input
                  v-model="filterChecked"
                  @change="toggleCheckbox('filterChecked')"
                  type="checkbox"
                  value=""
                  :disabled="filterChecked"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label class="ms-2 text-sm font-medium">Filtro</label>
              </div>

            </div>
          </div>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="default-modal"
            @click="close"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <div v-if="modalUser">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite o Nome do Servico</label
              >
              <input
                v-model="service.nameService"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descrição do Serviço"
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite o Valor do Serviço</label
              >
              <input
                v-model="service.price"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Valor do Serviço"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900"
                >Nome do Cliente</label
              >
              <select
                v-model="service.owner_id"
                @change="fetchCars"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option
                  v-for="owner in allOwners"
                  :key="owner.id"
                  :value="owner.id"
                >
                  {{ owner.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900"
                >Escolha o Carro:</label
              >
              <select
                v-model="service.car_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                :disabled="!service.owner_id"
              >
                <option
                  v-for="(cars, index) in allCars"
                  :key="index"
                  :value="service.owner_id"
                >
                  {{ cars.model }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900"
                >Mecânico Responsável:</label
              >
              <select
                v-model="service.worker_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option
                  v-for="worker in allWorkers"
                  :key="worker.id"
                  :value="worker.id"
                >
                  {{ worker.name }}
                </option>
              </select>
            </div>

            <div class="flex flex-col">
              <label for="startDate" class="text-sm font-medium text-gray-700"
                >Data Da Revisão</label
              >
              <input
                type="date"
                :min="today"
                @input="service.date = $event.target.value"
                class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
              />
            </div>
          </div>
          <div v-if="modalUpdate">
            <div class="flex flex-col">
              <label for="startDate" class="text-sm font-medium text-gray-700"
                >Data Da Revisão</label
              >
              <input
                type="date"
                :min="today"
                v-model="newService.date"
                @input="newService.date = $event.target.value"
                class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
              />
            </div>

            <div class="flex flex-col">
              <label for="startDate" class="text-sm font-medium text-gray-700"
                >Carro</label
              >
              <input
                type="text"
                v-model="newService.carName"
                disabled
                class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite o Nome do Servico</label
              >
              <input
                v-model="newService.nameService"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descrição do Serviço"
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite o Valor do Serviço</label
              >
              <input
                v-model="newService.price"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Valor do Serviço"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900"
                >Mecânico Responsável:</label
              >
              <select
                v-model="newService.worker_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option
                  v-for="worker in allWorkers"
                  :key="worker.id"
                  :value="worker.id"
                >
                  {{ worker.name }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="modalChart" class="flex flex-col">
          <div class="w-[50%] flex mobile">
            <CountServices :users="filterChar" />
            <CountServicesSplit :users="filterChar"/>
          </div>                                                                           
        </div>
          <div v-if="modalFilter">
            <div class="flex flex-col gap-1.5 text-center">
              <div class="flex gap-2 items-center justify-center mobile">
                <div class="flex flex-col">

             
       
            
                  <label
                    for="startDate"
                    class="text-sm font-medium text-gray-700"
                    >Data Início</label
                  >
                  <input
                    type="date"
                    v-model="filter.startDate"
                    @input="filter.startDate = $event.target.value"
                    class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="endDate" class="text-sm font-medium text-gray-700"
                    >Data Final:</label
                  >
                  <input
                    type="date"
                     v-model="filter.endDate"
                    @input="filter.endDate = $event.target.value"
                    class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="endDate" class="text-sm font-medium text-gray-700"
                    >Nome Proprietário</label
                  >
                  <input
                    type="text"
                    placeholder="Digite o Nome"
                    v-model="filter.name"
                    class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
                  />
                </div>
                
                <div
                  v-if="tooltip"
                  class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip"
                >
                  Média de Tempo Entre uma Revisão e Outra
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <div class="flex flex-col gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    @mouseover="tooltip = true"
                    @mouseleave="tooltip = false"
                    class="w-4"
                  >
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                    />
                  </svg>

                  <input
                    type="checkbox"
                    v-model="filter.average"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>
              </div>
              <div class="flex gap-2 items-center justify-center">
                <div>
                  <label class="block text-sm font-medium text-gray-900"
                    >Marca com:</label
                  >
                  <select
                    v-model="filter.brand"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="all" selected>Nenhuma Opção</option>
                    <option value="maior">Maior Número de Revisão</option>
                    <option value="menor">Menor Número de Revisão</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900"
                    >Mecânico Responsável:</label
                  >
                  <select
                    v-model="filter.worker"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="all" selected>Nenhuma Opção</option>
                    <option
                      v-for="worker in allWorkers"
                      :key="worker.id"
                      :value="worker.name"
                    >
                      {{ worker.name }}
                    </option>
                  </select>
                </div>



                <div
                  v-if="tooltipOwner"
                  class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip"
                >
                  Proprietários com Maior Número De Revisão
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <div class="flex flex-col gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    @mouseover="tooltipOwner = true"
                    @mouseleave="tooltipOwner = false"
                    class="w-4"
                  >
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                    />
                  </svg>

                  <input
                    type="checkbox"
                    v-model="filter.moreOwner"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-center justify-end p-2 border-t border-gray-200 rounded-b"
        >
          <div v-if="modalUser">
            <button
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              @click="addService"
            >
              Criar Usuário
            </button>
          </div>
          <div v-if="modalUpdate">
            <button
              type="button"
              class="focus:outline-none text-white bg-[#337C24] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              @click="atualizar"
            >
              Gravar
            </button>
            <button
              type="button"
              class="focus:outline-none text-white bg-[#FF3E30] hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              @click="apagar"
            >
              Apagar
            </button>
          </div>
          <div v-if="modalFilter">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              @click="setFilter"
            >
              Aplicar Filtro
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/services/http.js";
import TitleView from "../components/Title/TitleView.vue";
import TableView from "../components/Table/TableView.vue";
import LoadingCircle from "../components/loading/LoadingCircle.vue";
import CountServices from "../components/chards/CountServices.vue";
import CountServicesSplit from "../components/chards/CountServicesSplit.vue";
export default {
  name: "ListServices",
  components: {
    TitleView,
    TableView,
    LoadingCircle,    
    CountServices, CountServicesSplit

  },
  data() {
    return {
      tooltip: false,
      tooltipOwner: false,
      average: false,
      filter: {},
      loading: false,
      services: [],
      copyServices: [],
      headers: [
        "Nome do Proprietário",
        "Valor",
        "Feito Em",
        "Mecânico Responsável",
        "Mais Detalhes",
      ],
      today: new Date(),
      startDate: "",
      endDate: "",
      moreServices:false,
      modalChar: false,
      allWorkers: [],
      allOwners: [],
      allArray: [],
      allCars: [],
      newService: {},
      modalUpdate: false,
      modalFilter: false,
      modalUser: false,
      openModal: true,
      filterChecked:false,
      allChecked: true,
      newUser: {},
      modalContent: "",
      service: {},
    };
  },
  methods: {
    close() {
      (this.modalContent = ""), (this.openModal = true);
      this.modalUser = false;
      this.modalFilter = false;
      this.modalUpdate = false;
      this.modalChart = false;
      this.openModal = true;
    },
    toggleCheckbox(option) {
      if (option == "allChecked") {
        this.filterChecked = false;
        this.allChecked = true;
      }
      if (option == "filterChecked") {
        this.allChecked = false;
        this.filterChecked = true;
      }
    },
    openFilterModal() {
      this.modalFilter = true;
      this.openModal = false;
    },
    async fetchCars() {
      const data = await http.get("/cars-all/" + this.service.owner_id);
      this.allCars = data.data.data.cars;
    },
    async getResults() {
      try {
        this.loading = true;
        try {
          const data = await http.get("/all-services");
          const workers = await http.get("/workers-all");
          const owners = await http.get("/owners-all");
          this.allWorkers = workers.data.workers;
          this.allOwners = owners.data.owners;
          await this.setServices(data.data.services);
          this.allArray = this.services
          this.filterChar = this.services

        } catch (error) {
          console.log(error);
        }

        
      } catch (error) {
        this.loading = false;
        console.log(error.response);
      }
    },
    openUserModal() {
      (this.user = {
        name: "",
        password: "",
        email: "",
      }),
        (this.modalUser = true);
      this.openModal = false;
    },
    async addService() {
      this.loading = true;
      if (Object.keys(this.service).length != 6) {
        alert("Por favor Verifique Novamente");
      } else {
        try {
          this.loading = true;
          const data = await http.post("/service-register", this.service);
          console.log(data)
          alert("Revisão Cadastrada com sucesso");
          this.loading = false;
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
    },
    showDetails(details) {
      this.modalContent = details;
      this.newService = { ...details };
      this.modalUpdate = true;
      this.openModal = false;
    },
    async atualizar() {
      if (
        JSON.stringify(this.modalContent) === JSON.stringify(this.newService)
      ) {
        alert("Por favor verifique Novamente");
      } else {
        try {
          this.loading = true;
          await http.put("/service-update", this.newService);
          alert("Usuário Atualizado com sucesso");
          this.loading = false;
          window.location.reload();
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },
    async apagar() {
      try {
        this.loading = true;
        await http.delete("/service-delete/" + this.newService.owner_id);
        alert("Usuário Apagado com sucesso");
        this.loading = false;
        window.location.reload();
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async setServices(array) {
      const promises = array.map(async (user) => {
        let workerName = await this.getWorkerName(user.worker_id);
        let ownerName = await this.getOwnerName(user.owner_id);
        let carName = await this.getCarName(user.car_id);
        return {
          nameService: ownerName.name,
          price: "R$" + user.price,
          date: user.date_service,
          worker_name: workerName.name,
          implementar: {
            carName: carName,
            sexOwner: ownerName.sex,
            nameService: user.name_service,
            price: user.price,
            owner_id: user.id,
            date: user.date_service,
            service_id: user.id,
            car_id: user.car_id,
            worker_id: user.worker_id,
          },
        };
      });
      this.services = await Promise.all(promises);
      this.copyServices = this.services;
      this.loading = false;
    },
    async setFilter() {
      this.loading = true;
      if (
        Object.keys(this.filter).length === 0 ||
        this.filter.startDate > this.filter.endDate
      ) {
        alert("Por Favor Preencha Corretamente");
      } else {
        try {
          const data = await http.post("/filter-services", this.filter);
          if (this.filter.average) {
            this.headers = [
              "Média entre Revisões",
              "Nome Carro",
              "Mais Detalhes",
            ];

            this.services = data.data.map((user) => {
              return {
                
                avarage: user.average_days,
                car_name: user.car_name.model + " " + user.car_name.brand,
                implementar: {
                  nameService: user.service.name_service,
                  price: user.service.price,
                  owner_id: user.service.id,
                  date: user.service.date_service,
                  service_id: user.service.id,
                  car_id: user.service.car_id,
                  worker_id: user.service.worker_id,
                },
              };
            });
          } else {
            this.services = this.copyServices;
            this.setServices(data.data);
            this.headers = [
              "Nome do Proprietário",
              "Valor",
              "Feito Em",
              "Mecânico Responsável",
              "Mais Detalhes",
            ];
          }
        } catch (error) {
          console.log(error);
        }

        this.close();
      }
      this.loading = false;
    },
    async getWorkerName(id) {
      const data = await http.get("/worker/" + id);
      return data.data;
    },
    async getCarName(id)
    {
      const data = await http.get("/cars-all");
      const objetosEncontrados = data.data.cars.filter(objeto => objeto.id === id);
      return (objetosEncontrados[0].brand+" "+objetosEncontrados[0].model+" "+ objetosEncontrados[0].year)
    },
    async getOwnerName(id)
    {
      const data = await http.get("/owners-all");
      const objetosEncontrados = data.data.owners.filter(objeto => objeto.id === id);
      return ({
        "name":objetosEncontrados[0].name,
        "sex":objetosEncontrados[0].sex
      })
    },
    openChardModal()
    {
      this.modalChart = true;
      this.openModal = false;
    }
  },
  watch: {
    minAge(newVal) {
      this.minAge = newVal.replace(/\D+/g, "");
    },
    maxAge(newVal) {
      this.maxAge = newVal.replace(/\D+/g, "");
    },
    filterName(newVal) {
      this.filterName = newVal.replace(/\d+/g, "");
    },
  },
  mounted() {
    this.getResults();
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth() + 1;
    const dia = hoje.getDate();
    this.today = `${ano}-${mes < 10 ? "0" + mes : mes}-${
      dia < 10 ? "0" + dia : dia
    }`;
  },
  computed:{
    filterChar()
    {
    if (this.allChecked) return this.allArray;
    if(this.filterChecked)return this.services;
    return []  
    }
  }
};
</script>
