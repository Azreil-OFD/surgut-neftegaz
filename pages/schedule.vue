<template>
  <div class="data">
    <div class="select_date">
      Год:
      <DatePicker v-model="date" view="year" dateFormat="yy" @date-select="selectHandler" />
    </div>

    <table>
      <thead>
        <tr>
          <th>Месяц</th>
          <th v-for="day in daysInMonth" :key="day">{{ day }}</th>
          <th>Дни</th>
          <th>Часы</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(month, index) in schedule" :key="month.id">
          <td>{{ index + 1 }}</td>
          <td v-for="(day, dayIndex) in month.days" :key="dayIndex">{{ day }}</td>
          <td>{{ month.days_statistis }}</td>
          <td>{{ month.hours }}</td>
        </tr>
      </tbody>
    </table>
  </div>


</template>

<script lang="ts" setup>
const date = ref()
const schedule = ref([])
const selectHandler = () => {
  schedule.value = generateMatrix(date.value.getFullYear())
}

const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
</script>

<style scoped>
table {
  width: 100%;
  height: 70vh;
  border-collapse: collapse;
  text-align: center;
}

tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #ffffff;
}
th {
  background-color: #0ea5e9;
}
th,
td {
  padding: 5px;
  border: 1px solid black;
}

.data {
  display: flex;
  gap: 1vh;
  flex-direction: column;
  padding: 1vh;
}
</style>