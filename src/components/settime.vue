<template>
  <div>
    <!-- Controll btn -->
    <div
      class="mainBtn row shadow-3 cursor-pointer"
      @click="showDiaSetTime()"
      v-if="!disable"
    >
      <div class="icon"><q-icon name="fa-regular fa-clock" /></div>
      <div class="col">
        <div>{{ showTime1 }}</div>
        <div>{{ showTime2 }}</div>
      </div>

      <div class="icon2"><q-icon name="fa-solid fa-caret-down" /></div>
    </div>
    <div class="mainBtnDisable row shadow-3" v-else>
      <div class="icon"><q-icon name="fa-regular fa-clock" /></div>
      <div class="col">
        <div>{{ showTime1 }}</div>
        <div>{{ showTime2 }}</div>
      </div>

      <div class="icon2"><q-icon name="fa-solid fa-caret-down" /></div>
    </div>

    <div class="fullscreen backdrop" v-show="showDia"></div>

    <!-- Dialog -->
    <q-dialog v-model="showDia" persistent>
      <q-card class="cardSize"
        ><div class="setDisplay"><B>Set Display Time Interval</B></div>

        <div>
          <q-radio
            v-model="selectedTime"
            val="duration"
            label="Duration"
            class="fontRadio"
          />
        </div>
        <div>
          <div>
            <q-select
              outlined
              v-model="duration"
              :options="selectedDuration"
              dense
              class="selectBox"
            />
          </div>
          <div class="line"></div>
        </div>
        <div>
          <q-radio
            v-model="selectedTime"
            val="specific"
            label="Specific time"
            class="fontRadio"
          />
        </div>
        <div class="q-pt-sm" style="padding-left: 35px">Start date : time</div>
        <div class="row">
          <div>
            <q-input
              outlined
              v-model="startDate"
              dense
              type="date"
              class="inputBox"
            />
          </div>
          <div>
            <q-input
              outlined
              v-model="startTime"
              dense
              type="time"
              class="inputBoxTime"
            />
          </div>
        </div>
        <div class="q-pt-sm" style="padding-left: 35px">End date : time</div>
        <div class="row">
          <div>
            <q-input
              outlined
              v-model="endDate"
              dense
              class="inputBox"
              type="date"
            />
          </div>
          <div>
            <q-input
              outlined
              v-model="endTime"
              dense
              type="time"
              class="inputBoxTime"
            />
          </div>
        </div>
        <div class="row q-pt-lg justify-center">
          <div class="q-pr-md">
            <u
              ><q-btn
                flat
                label="Cancel"
                @click="closeDialog()"
                no-caps
                class="cancelBtn"
            /></u>
          </div>
          <div class="q-pl-md">
            <q-btn label="Apply" @click="applyBtn()" no-caps class="applyBtn" />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["projectInfo", "disable"],
  data() {
    return {
      showDia: false,
      showTime1: "",
      showTime2: "",
      showDialog: false,
      selectedTime: "duration",
      duration: "1 day",
      selectedDuration: ["1 day", "7 days", "15 days", "30 days"],
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    };
  },
  methods: {
    showDiaSetTime() {
      this.showDia = true;
    },
    closeDialog() {
      this.showDia = false;
    },
    async applyBtn() {
      if (this.selectedTime == "duration") {
        let currentDate = new Date();
        this.showTime2 =
          currentDate.getDate() +
          "/" +
          (currentDate.getMonth() + 1) +
          "/" +
          currentDate.getFullYear() +
          " " +
          this.addZero(currentDate.getHours()) +
          ":" +
          this.addZero(currentDate.getMinutes());
        if (this.duration == "1 day") {
          currentDate.setDate(currentDate.getDate() - 1);
          this.showTime1 =
            currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear() +
            " " +
            this.addZero(currentDate.getHours()) +
            ":" +
            this.addZero(currentDate.getMinutes());
        } else if (this.duration == "7 days") {
          currentDate.setDate(currentDate.getDate() - 7);
          this.showTime1 =
            currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear() +
            " " +
            this.addZero(currentDate.getHours()) +
            ":" +
            this.addZero(currentDate.getMinutes());
        } else if (this.duration == "15 days") {
          currentDate.setDate(currentDate.getDate() - 15);
          this.showTime1 =
            currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear() +
            " " +
            this.addZero(currentDate.getHours()) +
            ":" +
            this.addZero(currentDate.getMinutes());
        } else if (this.duration == "30 days") {
          currentDate.setDate(currentDate.getDate() - 30);
          this.showTime1 =
            currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear() +
            " " +
            this.addZero(currentDate.getHours()) +
            ":" +
            this.addZero(currentDate.getMinutes());
        }
        let sendTime = {
          showTime1: this.showTime1,
          showTime2: this.showTime2,
        };
        this.$emit("setTime", sendTime);
        this.closeDialog();
      } else if (this.selectedTime == "specific") {
        if (this.startDate.length == 0 || this.startTime.length == 0) {
          this.redNotify("please input start date and time");
          return;
        }
        if (this.endDate.length == 0 || this.endTime.length == 0) {
          this.redNotify("Please input end date");
          return;
        }

        let startDateTemp = this.startDate.split("-");
        let startDateShow =
          startDateTemp[2] + "/" + startDateTemp[1] + "/" + startDateTemp[0];
        let endDateTemp = this.endDate.split("-");
        let endDateShow =
          endDateTemp[2] + "/" + endDateTemp[1] + "/" + endDateTemp[0];
        this.showTime1 = startDateShow + " " + this.startTime;
        this.showTime2 = endDateShow + " " + this.endTime;
        let sendTime = {
          showTime1: this.showTime1,
          showTime2: this.showTime2,
        };
        this.$emit("setTime", sendTime);
        this.closeDialog();
      }
    },

    addZero(num) {
      if (Number(num) < 10) {
        return "0" + num;
      } else {
        return num;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.applyBtn();
    }, 300);
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}
.icon2 {
  width: 20px;
  padding-top: 12px;
}
.icon {
  width: 60px;
  font-size: 24px;
  padding-left: 15px;
}
.cardSize {
  height: 420px;
  width: 100%;
  max-width: 340px;
}
.setDisplay {
  font-size: 22px;
  text-align: center;
  padding-top: 20px;
}
.fontRadio {
  font-size: 14px;
}
.selectBox {
  width: 140px;
  margin-left: 35px;
}
.duration {
  padding-left: 40px;
  padding-top: 8px;
}
.line {
  width: 290px;
  height: 0.5px;
  background-color: black;
  margin-top: 15px;
  margin-left: 25px;
}
.inputBox {
  width: 135px;
  background-color: white;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 35px;
}
.inputBoxTime {
  width: 125px;
  background-color: white;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 10px;
}
.allCenter {
  text-align: center;
}
.applyBtn {
  width: 100px;
  height: 40px;
  background-color: #2865f0;
  color: white;
}
.cancelBtn {
  width: 100px;
  height: 40px;
}
.mainBtn {
  background-color: white;
  width: 210px;
  height: 45px;
  margin-top: 20px;
  margin-right: 15px;
}
.mainBtnDisable {
  background-color: #c4c4c4;
  width: 210px;
  height: 45px;
  margin-top: 20px;
  margin-right: 15px;
}
.currentText {
  padding-top: 10px;
}
</style>
