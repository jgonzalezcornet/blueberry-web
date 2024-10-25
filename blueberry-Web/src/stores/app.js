// Utilities
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const generateRandomAlias = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let randomAlias = "";
  for(let i = 0; i < 6; i++){
    randomAlias += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomAlias;
};

const generateRandomCVU = () => {
  const characters = "0123456789";
  let randomCVU = "";
  for(let i = 0; i < 22; i++){
    randomCVU += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomCVU;
};


export const useStore = defineStore('app', () => {
  const userId = ref(1);
  const users = ref([]);

  // Users
  function addUser({ name, lastname, email, dni, password }) {
    if(!name || !lastname || !email || !dni || !password){
      return { ok: false, message: "Faltan datos para la creacion del usuario." };
    }
    const id = userId.value++;
    users.value.push({ id, name, lastname, email, dni: Number(dni), password, balance: 0, alias: generateRandomAlias(), cvu: generateRandomCVU() });
    return { ok: true, message: "El usuario ha sido creado de forma exitosa."};
  };

  function removeUser(id) {
    if(!id){
      return { ok: false, message: "Se debe especificar la id del usuario a eliminar." };
    }
    users.value = users.value.filter(u => u.id != id);
    return { ok: true, message: "Usuario eliminado de forma exitosa." };
  };

  function getBalance(id) {
    if(!id){
      return { ok: false, message: "Se debe especificar la id del usuario." };
    }
    for(let user of users.value){
      if(user.id == id){
        return { ok: true, message: "Se ha extraido el balance del usuario de forma exitosa.", data: { balance: user.balance }};
      }
    }
    return { ok: false, message: "No se ha encontrado un usuario con el id especificado." };
  }

  function getAlias(id) {
    if(!id){
      return { ok: false, message: "Se debe especificar la id del usuario." };
    }
    for(let user of users.value){
      if(user.id == id){
        return { ok: true, message: "Se ha extraido el alias del usuario de forma exitosa.", data: { alias: user.alias }};
      }
    }
    return { ok: false, message: "No se ha encontrado un usuario con el id especificado." };
  }

  function getCVU(id) {
    if(!id){
      return { ok: false, message: "Se debe especificar la id del usuario." };
    }
    for(let user of users.value){
      if(user.id == id){
        return { ok: true, message: "Se ha extraido el cvu del usuario de forma exitosa.", data: { cvu: user.cvu }};
      }
    }
    return { ok: false, message: "No se ha encontrado un usuario con el id especificado." };
  }

  function setAlias(id, alias) {
    if(!id){
      return { ok: false, message: "Se debe especificar la id del usuario a eliminar." };
    }
    let idx = 0;
    for(let user of users.value){
      if(user.id == id){
        users.value[idx].alias = alias;
        return { ok: true, message: "Se ha actualizado el alias del usuario de forma exitosa." };
      }
      idx++;
    }
    return { ok: false, message: "No se ha encontrado un usuario con el id especificado." };
  }


  // Login
  const loggedUser = ref(undefined);

  function signIn({ email, password }) {
    if(!email || !password){
      return { ok: false, message: "Faltan datos para el ingreso del usuario." };
    }
    if(loggedUser.value){
      return { ok: false, message: "Un usuario ya esta ingresado actualmente." };
    }
    for(let user of users.value){
      if(user.email == email && user.password == password){
        loggedUser.value = { id: user.id, name: user.name, lastname: user.lastname };
        return { ok: true, message: "Se ha ingresado el usuario exitosamente." };
      }
    }
    return { ok: false, message: "Credenciales invalidas." };
  };

  function signOut() {
    if(!loggedUser.value){
      return { ok: false, message: "No hay un usuario ingresado actualmente." };
    }
    loggedUser.value = undefined;
    return { ok: true, message: "Se ha cerrado la sesion de forma exitosa." };
  }

  function getLoggedUser() {
    if(!loggedUser.value){
      return { ok: false, message: "No hay un usuario ingresado actualmente." };
    }
    return { ok: true, message: "Datos de usuario ingresado obtenidos exitosamente.", data: loggedUser.value };
  }


  // Cards
  const cards = ref([]);
  const cardId = ref(1);

  function addCard(id, { number, owner, expiration }) {
    if(!id || !number || !owner || !expiration || !expiration.month || !expiration.year){
      return { ok: false, message: "Faltan datos para la creacion de la tarjeta." };
    }
    for(let user of users.value){
      if(user.id == id){
        cards.value.push({ id: cardId.value++, userId: id, number: Number(number), owner, expiration: { month: Number(expiration.month), year: Number(expiration.year) } });
        return { ok: true, message: "La tarjeta ha sido creada de forma exitosa." };
      }
    }
    return { ok: false, message: "El usuario con el id especificado no existe." };
  }

  function removeCard(id) {
    if(!id){
      return { ok: false, message: "Se debe especificar el id de la tarjeta a eliminar." };
    }
    cards.value = cards.value.filter(c => c.id != id);
    return { ok: true, message: "La tarjeta ha sido eliminada de forma exitosa." };
  }

  function getCards(id) {
    if(!id){
      return { ok: false, message: "Se debe ingresar un id de usuario para encontrar sus tarjetas." };
    }
    const userCards = cards.value.filter(c => c.userId == id);
    return { ok: true, message: "Se han obtenido las tarjetas del usuario con exito.", data: { cards: userCards } };
  }

  function getCard(id) {
    if(!id){
      return { ok: false, message: "Se debe ingresar un id de tarjeta." };
    }
    for(let card of cards.value){
      if(card.id == id){
        return { ok: true, message: "Se han obtenido las tarjetas del usuario con exito.", data: { card } };
      }
    }
    return { ok: false, message: "No se ha encontrado una tarjeta con el id especificado." };
  }


  // Movements
  const movements = ref([]);

  function addMovement({ from, to, amount, method }){
    if(!from || !to || !amount || !method){
      return { ok: false, message: "Faltan datos para la creacion de un movimiento." };
    }
    movements.value.push({ from, to, amount });
    return { ok: true, message: "El movimiento ha sido creado de forma exitosa" };
  }

  function getMovements(id){
    if(!id){
      return { ok: false, message: "Faltan datos para poder obtener los movimientos." };
    }
    return movements.value.filter(movement => movement.from == id || movement.to == id);
  }


  // Data persistency
  const loadStoredState = () => {
    const savedState = JSON.parse(localStorage.getItem('app-store'));
    if (savedState) {
      userId.value = savedState.userId || 1;
      users.value = savedState.users || [];
      loggedUser.value = savedState.loggedUser || undefined;
      cards.value = savedState.cards || [];
      cardId.value = savedState.cardId || 1;
      movements.value = savedState.movements || [];
    }
  };

  loadStoredState();

  const saveStateToLocalStorage = () => {
    const stateToSave = {
      userId: userId.value,
      users: users.value,
      loggedUser: loggedUser.value,
      cards: cards.value,
      cardId: cardId.value,
      movements: movements.value,

    };
    localStorage.setItem('app-store', JSON.stringify(stateToSave));
  };

  watch(
    () => ({
      userId: userId.value,
      users: users.value,
      loggedUser: loggedUser.value,
      cards: cards.value,
      cardId: cardId.value,
      movements: movements.value,
    }),
    saveStateToLocalStorage,
    { deep: true }
  );

  // Make data accessable
  return {
    addUser,
    removeUser,
    getBalance,
    getAlias,
    getCVU,
    setAlias,
    signIn,      
    signOut,
    addCard,
    removeCard,
    getCards,
    getCard,
    addMovement,
    getMovements,
    getLoggedUser,
  };
});