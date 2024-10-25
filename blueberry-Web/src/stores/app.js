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

  function addUser({ name, lastname, email, dni, password }) {
    console.log(name, lastname, email, dni, password);
    if(!name || !lastname || !email || !dni || !password){
      return { ok: false, message: "Faltan datos para la creacion del usuario." };
    }
    const id = userId.value++;
    users.value.push({ id, name, lastname, email, dni, password, balance: 0, alias: generateRandomAlias(), cvu: generateRandomCVU() });
    return { ok: true, message: "El usuario ha sido creado de forma exitosa.", data: { id, name, lastname } };
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
        return { ok: true, message: "Se ha ingresado el usuario exitosamente.", data: loggedUser.value };
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

  const cards = ref([]);

  function addCard(id, { number, owner, month, year }) {
    if(!id || !number || !owner || !month || !year){
      return { ok: false, message: "Faltan datos para la creacion de la tarjeta." };
    }
    const u = undefined;
    for(let user of users.value){
      if(user.id == id){
        u = user;
      }
    }
    if(!u){
      return { ok: false, message: "El usuario con el id especificado no existe." };
    }
    cards.value.push({ userId: id, number, owner, month, year });
    return { ok: true, message: "La tarjeta ha sido creado de forma exitosa." };
  }

  function removeCard(id, { number }) {
    const c = undefined;
    for(let card of cards.value){
      if(card.number == number){
        c = card;
      }
    }
    if(!c){
      return { ok: false, message: "La tarjeta con el numero especificado no existe." };
    }
    cards = cards.filter(c => c.number != number && c.id != id);
    return { ok: true, message: "La tarjeta ha sido eliminada de forma exitosa." };
  }

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

  const loadStoredState = () => {
    const savedState = JSON.parse(localStorage.getItem('app-store'));
    if (savedState) {
      userId.value = savedState.userId || 0;
      users.value = savedState.users || [];
      loggedUser.value = savedState.loggedUser || undefined;
    }
  };

  loadStoredState();

  const saveStateToLocalStorage = () => {
    const stateToSave = {
      userId: userId.value,
      users: users.value,
      loggedUser: loggedUser.value,
    };
    localStorage.setItem('app-store', JSON.stringify(stateToSave));
  };

  watch(
    () => ({
      userId: userId.value,
      users: users.value,
      loggedUser: loggedUser.value,
    }),
    saveStateToLocalStorage,
    { deep: true }
  );

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
    addMovement,
    getMovements,
    getLoggedUser,
  };
});