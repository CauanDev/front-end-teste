<template>
  <LoadingCircle v-if="loading" />

  <div>
    <TitleView title="Proprietários" />
  </div>
  <div>
    <div class="flex justify-center w-full mt-10">
      <button
        type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        @click="openUserModal"
        :disabled="loading"
      >
        Adicionar Propietário
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
  <div class="flex justify-center max-h-[420px] overflow-y-auto">
    <TableView
      :headers="['Nome', 'Email', 'Criado Em', 'Ver Detalhes']"
      :body="users"
      @showDetails="showDetails"
      class="w-[50%]"
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
        <div v-if="modalUser">
            <h3 class="text-xl font-semibold text-gray-900">
              Criar Proprietário
            </h3>
          </div>
          <div v-if="modalUpdate">
            <h3 class="text-xl font-semibold text-gray-900">
              Alterar {{ modalContent.carName }}
            </h3>
          </div>
          <div v-if="modalFilter">
            <h3 class="text-xl font-semibold text-gray-900">
              Aplicar Filtro
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
              <div>
                <input 
                v-model="splitBySex"                       
                type="checkbox"  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                <label  class="ms-2 text-sm font-medium">Separar entre Gêneros</label>
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
                >Digite Nome</label
              >
              <input
                v-model="user.name"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Digite o nome"
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite Email</label
              >
              <input
                v-model="user.email"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Digite o email"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900"
                >Selecione o Sexo</label
              >
              <select
                v-model="user.sex"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite o Endereço</label
              >
              <input
                v-model="user.adress"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Digite o Endereço"
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite a Idade</label
              >
              <input
                v-model="user.age"
                type="number"
                min="1"
                max="999"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Digite a Idade"
              />
            </div>
          </div>
          <div v-if="modalUpdate">
            <div class="flex gap-[67%] w-full">
              <h2>Carros do Proprietário</h2>
              <svg
                data-accordion-icon
                class="w-4 h-4 rotate-180 shrink-0 mt-2 cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
                @click="tableNormal = !tableNormal"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </div>
            <div v-if="tableNormal" class="absolute z-18 w-[95%]">
              <h1 class="bg-white">
                Valor Total Gasto:R${{ modalContent.body.totalPrice }}
              </h1>
              <TableNormal
                :headers="['Marca', 'Última Revisão']"
                :body="modalContent.body.cars"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite Nome</label
              >
              <input
                v-model="owner.name"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Digite o nome"
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite Email</label
              >
              <input
                v-model="owner.email"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Digite o email"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900"
                >Selecione o Sexo</label
              >
              <select
                v-model="owner.sex"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite o Endereço</label
              >
              <input
                v-model="owner.adress"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Digite o Endereço"
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Digite a Idade</label
              >
              <input
                v-model="owner.age"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Digite a Idade"
              />
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
              </div>
              <div class="flex gap-2 items-center justify-center mobile">
                <div>
                  <label class="block text-sm font-medium text-gray-900"
                    >Selecione o Sexo</label
                  >
                  <select
                    v-model="filter.sex"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="A" selected>Todos as opções</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
                <div>
                  <label
                    for="startDate"
                    class="text-sm font-medium text-gray-700"
                    >Idade Mínima</label
                  >
                  <input
                    type="text"
                    v-model="filter.minAge"
                    class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    for="startDate"
                    class="text-sm font-medium text-gray-700"
                    >Idade Máxima</label
                  >
                  <input
                    type="text"
                    v-model="filter.maxAge"
                    class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
                  />
                </div>
              </div>
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
          <div class="w-[50%] flex  mobile">

            <div v-if="!splitBySex">
              <AgeChard :users="filterChar" />
            </div>
            <div v-else>
              <AgeChardSplit :users="filterChar" />
            </div>
            <div v-if="allChecked">
              <BrandChard
              :brands="brandArray"
              />              
            </div>
            <div v-if="filterChecked">
              <BrandChard
              :brands="brandArrayFilter"
              />              
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
              @click="addUser"
            >
              Criar Veículo
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
import { format } from "date-fns";
import LoadingCircle from "../components/loading/LoadingCircle.vue";
import TableNormal from "../components/Table/TableNormal.vue";
import CountChart from "../components/chards/CountChard.vue";
import SexChard from "../components/chards/SexChard.vue";
import AgeChard from "../components/chards/AgeChard.vue";
import AgeChardSplit from "../components/chards/AgeChardSplit.vue";
import CountChardSplit from "../components/chards/CountChardSplit.vue";
import BrandChard from "../components/chards/BrandChard.vue";
export default {
  name: "ListOwners",
  components: {
    TitleView,
    TableView,
    LoadingCircle,
    TableNormal,
    CountChart,
    SexChard,
    AgeChard,
    AgeChardSplit,
    CountChardSplit,BrandChard
  },
  data() {
    return {
      maxAge: "",
      minAge: "",
      body: {},
      loading: false,
      users: [],
      allArray: [],
      splitBySex: false,
      filterChecked: false,
      allChecked: true,
      sex: "A",
      startDate: "",
      tableNormal: false,
      endDate: "",
      brandArray:[],
      brandArrayFilter:[],
      modalUpdate: false,
      modalFilter: false,
      modalUser: false,
      openModal: true,
      newUser: {},
      modalContent: "",
      user: {},
      owner: {},
      filter: {},
    };
  },
  methods: {
    openChardModal() {
      this.modalChart = true;
      this.openModal = false;
    },
    close() {
      this.user = {};
      (this.modalContent = ""), (this.openModal = true);
      this.modalUser = false;
      this.modalFilter = false;
      this.modalUpdate = false;
      this.tableNormal = false;
      this.modalChart = false;
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

    async getResults() {
      try {
        this.loading = true;
        const { data } = await http.get("/owners-all");
        const owners = data.owners;
        await this.setUsers(owners);
        const brand  = await http.post("/cars-brand"); 
        this.brandArray = brand.data
        this.brandArrayFilter = brand.data
        this.allArray = this.users
        this.filterChar = this.users
        this.loading = false;
      } catch (error) {
        console.error("Erro ao obter os resultados:", error);
        this.loading = false;
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

    async getBody(id) {
      try {
        const { data } = await http.get(`/cars-all/${id}`);
        return data.data;
      } catch (error) {
        console.error(`Erro ao obter body para id ${id}:`, error);
        throw error;
      }
    },
    openUserModal() {
      (this.user = {}), (this.modalUser = true);
      this.openModal = false;
    },
    async addUser() {
      this.loading = true;
      if (
        this.user.name &&
        this.user.age &&
        this.user.email &&
        this.user.sex &&
        this.user.adress
      ) {
        try {
          await http.post("/owners-register", this.user);
          window.location.reload();
          this.loading = false;
        } catch (error) {
          this.loading = false;
        }
      }
    },
    showDetails(details) {
      this.modalContent = details;
      this.owner = { ...details };
      this.newUser = this.owner;
      this.openModal = false;
      this.modalUpdate = true;
    },
    async atualizar() {
      if (JSON.stringify(this.modalContent) == JSON.stringify(this.owner)) {
        alert("Faça uma Alteração Primeiro!");
      } else {
        if (this.modalContent.name != this.owner.name) {
          this.newUser.name = this.owner.name;
        }
        if (this.modalContent.email != this.owner.email) {
          this.newUser.email = this.owner.email;
        }
        if (this.modalContent.sex != this.owner.sex) {
          this.newUser.sex = this.owner.sex;
        }
        if (this.modalContent.age != this.owner.age) {
          this.newUser.age = this.owner.age;
        }
        if (this.modalContent.adress != this.owner.adress) {
          this.newUser.adress = this.owner.adress;
        }
        try {
          this.loading = true;
          await http.put("/update-owner", this.newUser);
          window.location.reload();
          alert("Funcionário Atualizado com sucesso");
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },
    async apagar() {
      this.loading = true;
      try {
        await http.delete(
          "/delete-owner/" + this.modalContent.id,
          this.newUser
        );
        alert("Veículo Apagado com sucesso");
        this.loading = false;
        window.location.reload();
      } catch (error) {
        this.loading = false;
      }
    },
    async setFilter() {
      if (
        this.filter == {} ||
        this.filter.maxDate < this.filter.minDate ||
        this.filter.maxAge < this.filter.minAge
      ) {
        alert("Por Favor Digite Corretamente");
      } else {
        try {
          this.loading = true;
          const data = await http.post("/filter-owners", this.filter);
          this.setUsers(data.data.owner);
          const brand = await http.post("/cars-brand",this.filter,{}); 
          this.brandArrayFilter = brand.data
          this.loading = false;
          this.close();
        } catch (error) {
          this.loading = false;
        }
      }
    },
  },
  watch: {

  },
  mounted() {
    this.getResults();
  },
  computed:{
    filterChar()
    {
    if (this.allChecked) return this.allArray;
    if(this.filterChecked)return this.users
    return []  
    }
  }
};
</script>
