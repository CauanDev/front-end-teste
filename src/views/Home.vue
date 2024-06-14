<template>
  <div>
    <FechamentoCaixa
      nomeLoterica="DouraSoft"
      tflQuantity1="5"
      tflTime1="15 Min"
      spreadsheetTime1="15 Min"
      checkTime1="15 Min"
      operatorSalary1="R$ 1500,00"
      managerSalary1="R$ 3000,00"
      lotericoSalary1="R$ 10000,00"
    />
    <div v-if="showBlur" class="overlay">
      <div class="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-300 text-center">
        <h3>Faça o seu Diagnóstico Próprio e saber como economizar mais!</h3>
        <p class="pb-2">Acesse esse link ou responda pelo site!</p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <a href="https://tbchat.dourasoft.com.br/diagnostico-horas">Vamos nessa!</a>            
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FechamentoCaixa from "../components/diagnostico/FechamentoCaixa.vue";

export default {
  name: 'HelloView',
  components: { FechamentoCaixa },
  data() {
    return {
      showBlur: false
    };
  },
  mounted() {
    // Aplica o efeito de desfoque após 2 segundos
    setTimeout(() => {
      this.showBlur = true;
    }, 15000);

    // Seu código para inicializar o Typebot
    const typebotInitScript = document.createElement("script");
    typebotInitScript.type = "module";
    typebotInitScript.innerHTML = `import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.2.22/dist/web.js'

    Typebot.initBubble({
      typebot: "diagnostico-horas",
      apiHost: "https://tbchat.dourasoft.com.br",
      previewMessage: {
        message: "Venha fazer seu o Diagnóstico Personalizado!",
        autoShowDelay: 2000,
        avatarUrl: "https://s3.us-east-1.amazonaws.com/typebot-dourasoft/public/workspaces/cli0a3o0d0002pc4jsqdksyyf/typebots/clw9nhe4g000qpg1h4j6mn5gc/hostAvatar?v=1715969591209",
      },
      theme: {
        button: {
          backgroundColor: "#0042DA",
          customIconSrc: "https://veja.dourasoft.com.br/wp-content/uploads/2024/05/logo-1.png",
          size: "large",
        },
        previewMessage: { backgroundColor: "#085c4c", textColor: "#FFFFFF" },
      },
    });
    `;
    document.body.append(typebotInitScript);
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Mesmo z-index que o backdrop do modal Bootstrap */
  background-color: rgba(255, 255, 255, 0.7); /* Overlay claro para aprimorar o efeito de desfoque */
}
</style>
