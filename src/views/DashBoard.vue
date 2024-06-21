<template>
  <LoadingCircle v-if="loading" />

  <div>
    <TitleView title="Relatórios" />
  </div>
  <div>
    <div class="flex justify-center w-full mt-10">
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        @click="openFilterModal"
      >
        Selecionar Relatório
      </button>
      <button
        type="button"
        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        @click="openChardModal"
      >
        Visualizar Gráficos
      </button>
      <button
        type="button"
        :disabled="generate"
        :class="{ 'cursor-not-allowed': generate }"
        @click="generateReport"
        class="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 ml-2 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
      >
        <svg
          fill="#ffffff"
          class="size-5 mr-1"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 64 64"
          enable-background="new 0 0 64 64"
          xml:space="preserve"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Text-files">
              <path
                d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"
              ></path>
              <path
                d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"
              ></path>
              <path
                d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"
              ></path>
              <path
                d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"
              ></path>
              <path
                d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"
              ></path>
            </g>
          </g>
        </svg>
        Imprimir Reltório
      </button>
      
    </div>
  </div>
  <div class="flex justify-center flex-col w-full overflow-y-auto items-center">
    <TableNormal :headers="headers" :body="array" class="w-[50%]" />
    <TableNormal :headers="subHeaders" :body="subArray" />
  </div>

  <div
    id="default-modal"
    :class="{ hidden: openModal }"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h1 class="text-xl font-semibold text-gray-900">Selecionar Relatório de {{ getFilterName() }}</h1>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black-200 rounded-lg text-sm ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal" @click="close" >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /></svg> 
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <div v-if="modalFilter" class="flex gap-2">

            <div class="border-r border-gray px-2">
              <h3>Tema de Relatório:</h3>
              <div class="flex items-center">
                <input
                  v-model="selectedFilter"
                  type="radio"
                  value="owners"
                  name="reportFilter"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-radio-2"
                  class="ms-2 text-md font-medium text-gray-700"
                  >Proprietários</label
                >
              </div>

              <div class="flex items-center">
                <input
                  v-model="selectedFilter"
                  type="radio"
                  value="workers"
                  name="reportFilter"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-radio-2"
                  class="ms-2 text-md font-medium text-gray-700"
                  >Funcionários</label
                >
              </div>

              <div class="flex items-center">
                <input
                  v-model="selectedFilter"
                  type="radio"
                  value="users"
                  name="reportFilter"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-radio-2"
                  class="ms-2 text-md font-medium text-gray-700"
                  >Usuários</label
                >
              </div>

              <div class="flex items-center">
                <input
                  v-model="selectedFilter"
                  type="radio"
                  value="cars"
                  name="reportFilter"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-radio-2"
                  class="ms-2 text-md font-medium text-gray-700"
                  >Veículos</label
                >
              </div>

              <div class="flex items-center">
                <input
                  v-model="selectedFilter"
                  type="radio"
                  value="services"
                  name="reportFilter"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-radio-2"
                  class="ms-2 text-md font-medium text-gray-700"
                  >Revisões</label
                >
              </div>
            </div>
            <div
              v-if="selectedFilter === 'owners'"
              class="w-full flex justify-center"
            >
              <FilterOwner
                v-model:startDate="filterOwner.startDate"
                v-model:endDate="filterOwner.endDate"
                v-model:name="filterOwner.name"
                v-model:sex="filterOwner.sex"
                v-model:minAge="filterOwner.minAge"
                v-model:maxAge="filterOwner.maxAge"
                v-model:brand="filterOwner.brand"
                v-model:order="filterOwner.order"
                v-model:ordenateOrder="filterOwner.ordenateOrder"
              />
            </div>
            <div
              v-if="selectedFilter === 'workers'"
              class="w-full flex justify-center"
            >
              <FilterWorker
                v-model:startDate="filterWorker.startDate"
                v-model:endDate="filterWorker.endDate"
                v-model:name="filterWorker.name"
                v-model:sex="filterWorker.sex"
                v-model:minAge="filterWorker.minAge"
                v-model:maxAge="filterWorker.maxAge"
                v-model:maxSalary="filterWorker.maxSalary"
                v-model:minSalary="filterWorker.minSalary"
                v-model:order="filterWorker.order"
                v-model:ordenateOrder="filterWorker.ordenateOrder"
              />
            </div>
            <div
              v-if="selectedFilter === 'users'"
              class="w-full flex justify-center"
            >
              <FilterUser
                v-model:startDate="filterUser.startDate"
                v-model:endDate="filterUser.endDate"
                v-model:name="filterUser.name"
                v-model:order="filterUser.order"
                v-model:ordenateOrder="filterUser.ordenateOrder"
              />
            </div>
            <div
              v-if="selectedFilter === 'cars'"
              class="w-full flex justify-center"
            >
              <FilterVehicles
                v-model:startDate="filterVehicles.startDate"
                v-model:endDate="filterVehicles.endDate"
                v-model:minYear="filterVehicles.minYear"
                v-model:maxYear="filterVehicles.maxYear"
                v-model:brand="filterVehicles.brand"
                v-model:order="filterVehicles.order"
                v-model:subOrder="filterVehicles.subOrder"
                v-model:ordenateOrder="filterVehicles.ordenateOrder"/>
            </div>
            <div
              v-if="selectedFilter === 'services'"
              class="w-full flex justify-center"
            >
              <FilterService
                v-model:name="filterService.name"
                v-model:moreServices="filterService.moreServices"
                v-model:brand="filterService.brand"
                v-model:worker="filterService.worker"
                v-model:average="filterService.average"
              />
            </div>
          </div>
        </div>

        <div v-if="modalChart" class="flex flex-col mobile">
          <div class="w-[50%] flex mobile">
            <SexChard :users="filterChar" />
            <div v-if="!splitBySex">
              <CountChart :users="filterChar" />
            </div>
            <div v-else>
              <CountChardSplit :users="filterChar" />
            </div>
          </div>
          <div class="w-[50%] flex mobile">
            <div v-if="!splitBySex">
              <AgeChard :users="filterChar" />
            </div>
            <div v-else>
              <AgeChardSplit :users="filterChar" />
            </div>
            <div v-if="allChecked">
              <BrandChard :brands="brandArray" />
            </div>
            <div v-if="filterChecked">
              <BrandChard :brands="brandArrayFilter" />
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-center justify-end p-2 border-t border-gray-200 rounded-b"
        >

          <div v-if="modalFilter">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              @click="setFilter"
            >
              Emitir Relatório
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
import { format } from "date-fns";
import LoadingCircle from "../components/loading/LoadingCircle.vue";
import TableNormal from "../components/Table/TableNormal.vue";
import CountChart from "../components/chards/CountChard.vue";
import SexChard from "../components/chards/SexChard.vue";
import AgeChard from "../components/chards/AgeChard.vue";
import AgeChardSplit from "../components/chards/AgeChardSplit.vue";
import CountChardSplit from "../components/chards/CountChardSplit.vue";
import BrandChard from "../components/chards/BrandChard.vue";
import FilterOwner from "../components/filter/FilterOwner.vue";
import FilterWorker from "../components/filter/FIlterWorker.vue";
import FilterUser from "../components/filter/FilterUser.vue";
import FilterVehicles from "../components/filter/FilterVehicles.vue";
import FilterService from "../components/filter/FilterService.vue";
import { useAuth } from "@/stores/auth.js";

export default {
  name: "DashBoard",
  components: {
    TitleView,
    LoadingCircle,
    TableNormal,
    CountChart,
    SexChard,
    AgeChard,
    AgeChardSplit,
    CountChardSplit,
    BrandChard,
    FilterOwner,
    FilterWorker,
    FilterUser,
    FilterVehicles,
    FilterService,
  },
  data() {
    return {

      loading: false,
      generate: true,
      users: [],
      headers: ["Selecione Um Relatório"],
      array:{},
      subHeaders: [],
      subArray:{},
      openSubTable: false,
      splitBySex: false,
      filterChecked: false,
      userFilter: false,
      ownerFilter: false,
      carsFilter: false,
      selectedFilter: "cars",
      servicesFilter: false,
      workersFilter: false,
      modalFilter: true,
      openModal: false,
      filterOwner: {},
      filterWorker: {},
      filterUser: {},
      filterVehicles: {},
      filterService: {},
    };
  },
  methods: {
    openChardModal() {
      this.modalChart = true;
      this.openModal = false;
    },
    close() {
      this.filter = {};
      (this.modalContent = ""), (this.openModal = true);
      this.modalFilter = false;
      this.modalChart = false;
      this.generate = false;
      this.loading = false;
    },
    openFilterModal() {
      this.modalFilter = true;
      this.openModal = false;
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

    async setUsers(array) {
      const promises = array.map(async (user) => {
        const body = await this.getBody(user.id);

        return {
          name: user.name,
          email: user.email,
          created_at: format(new Date(user.created_at), "dd/MM/yyyy"),
          implementar: {
            name: user.name,
            email: user.email,
            id: user.id,
            sex: user.sex,
            age: user.age,
            adress: user.adress,
            body: body,
          },
        };
      });

      this.users = await Promise.all(promises);
    },
    getFilterName()
    {
      if(this.selectedFilter === "owners") return "Proprietários"
      if(this.selectedFilter === "workers") return "Funcionários"
      if(this.selectedFilter === "users") return "Usuários"
      if(this.selectedFilter === "cars") return "Veículos"
      return "Revisões"
      
    },
    async getBody(id) {
      try {
        const { data } = await http.get(`/cars-all/${id}`);
        return data.data;
      } catch (error) {
        console.error(`Erro ao obter body para id ${id}:`, error);
        throw error;
      }
    },
    showDetails(details) {
      this.modalContent = details;
      this.owner = { ...details };
      this.newUser = this.owner;
      this.openModal = false;

    },
    setFilter() {
      if (this.selectedFilter === "owners") this.filterOwners();
      if (this.selectedFilter === "services") this.filterServices();
      if (this.selectedFilter ==="cars") this.filterCars();
      if (this.selectedFilter === "users") this.filterUsers();
      if (this.selectedFilter === "workers") this.filterWorkers();
    },

    async setArrayOwners(array) {
      this.array = await Promise.all(
        array.map(async (owner) => {
          try {
            const body = await http.get("/cars-all/" + owner.id);
            return {
              name: owner.name,
              contServices: owner.number_services,
              contCars: body.data.count,
              created_at: format(new Date(owner.created_at), "dd/MM/yyyy"),
            };
          } catch (error) {
            console.log(error);
            return {
              name: owner.name,
              contServices: owner.number_services,
              contCars: 0,
              created_at: format(new Date(owner.created_at), "dd/MM/yyyy"),
            };
          }
        })
      );
    },
    async setArrayVehicles(array)
    {
      this.array = await Promise.all(
        array.map(async (car) => {
          try {
            const body = await http.get("/cars-all/" + car.owner_id);
            console.log(body)
            return {
              owner_name: body.data.data.owner.name,
              name: car.brand+" "+car.model+" "+car.year,
              contServices: car.number_services,
              last_service: format(new Date(car.last_service), "dd/MM/yyyy"),
            };
          } catch (error) {
            console.log(error);
            
          }
        })
      );

      this.headers=["Nome Proprietário","Carro","Quantidade Revisões","Última Revisão"]
      this.close()
    },
    setArrayUsers(array)
    {
      this.array = array.map((user)=>{
        return {
          name: user.name,
          email: user.email,
          created_at: format(new Date(user.created_at), "dd/MM/yyyy")
        }
      });
    },
    async setArrayWorkers(array) {
      this.array = await Promise.all(
        array.map(async (worker) => {
          try {
            const body = await http.get("/worker/" + worker.id);
            return {
              name: worker.name,
              salary: "R$ " + worker.salary,
              contServices: body.data.count,
              created_at: format(new Date(worker.created_at), "dd/MM/yyyy"),
            };
          } catch (error) {
            console.log(error);
            return {
              name: worker.name,
              salary: "R$ " + worker.salary,
              contServices: 0,
              created_at: format(new Date(worker.created_at), "dd/MM/yyyy"),
            };
          }
        })
      );
    },
    async filterOwners() {

      if (Object.keys(this.filterOwner).length === 0) 
      {
        this.loading = true;
        try {
          const data = await http.get("/owners-all");
          await this.setArrayOwners(data.data.owners);
          this.generate = false;
          this.loading = false;
          this.headers = [
            "Nome",
            "Quantidade de Revisões",
            "Quantidade de Carro",
            "Criado Em",
          ];
        } catch (error) {
          console.log(error);
        }
        this.loading = false;

        this.close();
      }
      else 
      {
        this.loading = true;
        try 
        {
          const data = await http.post("/filter-owners", this.filterOwner);

          if (data.data.owner.length == 0) {
            alert("Sua Consulta Retornou zero");
          } else {
            await this.setArrayOwners(data.data.owner);
            this.close();
            this.headers = [
              "Nome",
              "Quantidade de Revisões",
              "Quantidade de Carro",
              "Criado Em",
            ];
          }
          this.generate = false;
        } catch (error) {
          console.log(error);
        }
        this.loading = false;
      }
    },
    async filterWorkers() {

      console.log("Iniciando Filtro de Workers");
      if (Object.keys(this.filterWorker).length === 0) {
        this.loading = true;
        const data = await http.get("/workers-all");
        console.log(data.data);
        await this.setArrayWorkers(data.data.workers);
        this.headers = [
          "Nome",
          "Salário",
          "Quantidade de Serviços",
          "Criado Em",
        ];

        this.close();
      } else {
        this.loading = true;
        try {
          console.log(this.filter);
          const data = await http.post("/filter-workers", this.filterWorker);
          if (data.data.workers.length == 0) {
            alert("Sua Consulta Retornou zero");
          } else {
            await this.setArrayWorkers(data.data.workers);

            this.close();
            this.headers = [
              "Nome",
              "Salário",
              "Quantidade de Serviços",
              "Criado Em",
            ];
          }
        } catch (error) {
          console.log(error);
        }
        this.loading = false;
      }
    },
    async filterCars() {
      if (Object.keys(this.filterVehicles).length === 0) 
      {
        try {
          const data = await http.get('/cars-all')
          console.log(data.data.cars)
          this.setArrayVehicles(data.data.cars)
        } catch (error) {
          console.log(error)
        }
      }
      else
      {
        try {
          console.log(this.filterVehicles)
          const data = await http.post('/cars-filter',this.filterVehicles)
          this.setArrayVehicles(data.data)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async filterUsers() {
      console.log("Iniciando Filtro de Users");
      if (Object.keys(this.filterUser).length === 0) 
      {
        try 
        {
          this.loading = true
          const data = await http.get("users-all");
          this.setArrayUsers(data.data.users);
          this.loading = false
          this.headers=["Nome","Email","Criado Em"]
          this.close()
        } 
        catch (error) 
        {
          console.log(error)
        }
      }
      else
      {
        try 
        {
          this.loading = true
          const data = await http.post('/filter-users',this.filterUser)
          this.headers=["Nome","Email","Criado Em"]
          this.setArrayUsers(data.data.users)
          this.close()
        } 
        catch (error) 
        {
          console.log(error)
        }
      }
    },
    filterServices() {
      console.log("Iniciando Filtro de Services");
    },
    async generateReport() {
      this.loading = true;
      try {
        console.log(this.array);
        const data = await http.post(
          "/generate-report",
          {
            head: this.headers,
            body: this.array,
            title: "de Funcionários",
            user: this.getName(),
          },
          {
            responseType: "blob",
          }
        );
        console.log(data);
        const url = window.URL.createObjectURL(new Blob([data.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "relatorio.pdf");
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        this.loading = false;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    getName() {
      const auth = useAuth();
      if (auth.isAuthenticated) return auth.user.name;
    },
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
  mounted() {},
  computed: {
    filterChar() {
      if (this.allChecked) return this.allArray;
      if (this.filterChecked) return this.users;
      return [];
    },
  },
};
</script>
