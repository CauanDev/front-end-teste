<template>
<div class="flex flex-col text-4xl font-semibold items-center justify-center p-5 border border-gray-300 rounded-lg bg-gray-100 shadow-md">
{{ title }}
</div>

</template>
 <script>
  export default {
    name: 'TitleView',
    props: {
      title: {
        type: String,
        required: true
      },
      subTitle: {
        type: String,
        required: false
      }
    }
  };
  </script>