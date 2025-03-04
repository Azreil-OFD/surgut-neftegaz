<template>
  <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit"
    class="flex flex-col gap-4 w-full sm:w-56">
    <h1>Информационная система <br> для сотрудников ПАО {{ "<<Сургутнефтегаз>>" }}</h1>
    
    <div class="flex flex-col gap-1">
      <InputText name="username" type="text" placeholder="Логин" fluid />
      <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
        $form.username.error?.message }}</Message>
    </div>
    <div class="flex flex-col gap-1">
      <InputText name="password" type="text" placeholder="Пароль" fluid />
      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
        $form.password.error?.message }}</Message>
    </div>
    <Message v-if="errorForm" severity="error" size="large" variant="simple">{{
        errorForm }}</Message>
    <Button type="submit" severity="info" label="Вход" />
  </Form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
const appwrite = useAppwrite();
const errorForm = ref("")
const router = useRouter()
const initialValues = ref({
  username: '',
  password: ''
});
const resolver = ref(zodResolver(
  z.object({
    username: z.string().min(4, { message: 'Введите логин.' }),
    password: z.string().min(4, { message: 'Введите пароль.' })
  })
));
const onFormSubmit = async (data:any) => {
  errorForm.value = ""
  console.log(data)
  console.log(data.states.username.value )
  if (data.valid) {
    try {
      const result = await appwrite.account.createEmailPasswordSession(data.states.username.value + "@local.local", data.states.password.value)
      if(result.current ) {
        router.push("/")
      } else {
        errorForm.value = "Ошибка сервиса, попробуйте позже."
      }
    } catch (error) {
      errorForm.value = "Не верный логин или пароль."
    }
  }
};
definePageMeta({
  layout: 'login'
})
</script>
<style scoped lang="scss">
Form {
  display: flex;
  flex-direction: column;
  padding: 2vh;
  gap: 1vh;
  --p-inputtext-focus-border-color: #0989b9;

  h1 {
    font-size: 2cap;
    text-align: center;
  }

}
</style>