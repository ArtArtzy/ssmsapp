<template>
  <div>
    <q-dialog v-model="showDia" persistent>
      <q-card class="cardSize"
        ><div class="setDisplay"><B>Set Display Time Interval</B></div>
        <div>
          <q-radio
            v-model="selectedTime"
            val="current"
            label="Current Time"
            class="fontRadio"
          />
        </div>
        <div class="row">
          <div class="col-6 duration">Duration</div>
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
            label="Specific Time"
            class="fontRadio"
          />
        </div>
        <div class="q-pt-sm" style="padding-left: 35px">Start date : time</div>
        <div>
          <q-input
            outlined
            v-model="start"
            dense
            class="inputBox"
            placeholder="Example: 24/02/2023 18:00"
          />
        </div>
        <div class="q-pt-sm" style="padding-left: 35px">End date : time</div>
        <div>
          <q-input
            outlined
            v-model="end"
            dense
            class="inputBox"
            placeholder="Example: 24/02/2023 20:00"
          />
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
  props: ["showDia"],
  data() {
    return {
      showDialog: false,
      selectedTime: "current",
      duration: "1 day",
      selectedDuration: ["1 day", "7 days", "15 days", "30 days"],
      start: "",
      end: "",
    };
  },
  methods: {
    closeDialog() {
      this.showDia = false;
    },
    async applyBtn() {
      if (this.selectedTime == "current") {
        let fileLink = this.apiPath + "setcurrenttime.php";
        let sentData = {
          duration: this.duration,
        };
        let returnValue = await axios.post(fileLink, JSON.stringify(sentData));
        if (returnValue.data == "finish") {
          this.closeDialog();
        }
      } else {
        if (this.start.length == 0) {
          this.redNotify("please input start date");
          return;
        }
        if (this.end.length == 0) {
          this.redNotify("Please input end date");
          return;
        }
        let fileLink = this.apiPath + "setspecifictime.php";
        let sentData = {
          startDate: this.start,
          endDate: this.end,
        };
        let returnValue = await axios.post(fileLink, JSON.stringify(sentData));
        if (returnValue.data == "finish") {
          this.closeDialog();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cardSize {
  height: 430px;
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
  margin-left: 15px;
}
.inputBox {
  width: 275px;
  background-color: white;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 35px;
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
</style>
