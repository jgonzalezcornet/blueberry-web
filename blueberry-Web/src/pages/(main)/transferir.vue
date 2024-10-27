<template>
  <TransferirForm v-if="!confirmation" @set-data="setData" />
  <TransferirConfirm v-else @back="unconfirm" @submit="handleSubmit" :amount="amount" :to="to" />
</template>

<script setup>
  import { ref } from 'vue';
  import TransferirForm from '../../components/TransferirForm.vue';
  import TransferirConfirm from '../../components/TransferirConfirm.vue';
  import { useStore } from '../../stores/app';
  import { useRouter } from 'vue-router';
  import ErrorHandler from '../../utils/ErrorHandler';
  import getLoggedUserId from '../../utils/getLoggedUserId';

  const store = useStore();
  const router = useRouter();

  const confirmation = ref(false);
  const amount = ref("");
  const to = ref("");
  const method = ref("");

  const unconfirm = () => {
    confirmation.value = false;
  }

  const setData = ({ newAmount, newTo, newMethod }) => {
    if(newMethod == "link"){
      const response = store.getLinkData(newTo);
      if(!response.ok){
        ErrorHandler({ status: 400, message: response.message });
        return;
      }
      amount.value = response.data.amount;
      to.value = response.data.to;
    } else {
      amount.value = newAmount;
      to.value = newTo;
    }
    method.value = newMethod;
    confirmation.value = true;
  }
  
  const handleSubmit = () => {
    const id = getLoggedUserId();
    if(!id?.id){
      ErrorHandler({ status: 400, message: "No se ha encontrado el id del usuario ingresado." });
      return;
    }
    const response = store.addMovement(id.id, { to: to.value, amount: amount.value, method: method.value == "link" ? "alias" : method.value });
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      return;
    }
    router.push("/(main)/actividad");
  }
</script>