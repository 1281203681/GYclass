let age = "1"
let min = ""
let height = ""
let feMin = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: [
      { value: '0', name: '男', checked: 'true' },
      { value: '1', name: '女' },
    ],
    age: [

      { value: '1', name: '大一', checked: 'true' },
      { value: '2', name: '大二' },
      { value: '3', name: '大三' },
      { value: '4', name: '大四' },
    ],
    color: ["linear-gradient(to bottom, rgb(133,221,255), rgb(205, 252, 245));", "linear-gradient(to bottom, rgb(255, 182, 222), rgb(253, 226, 236));"],
    sexValue: 0,
    hidMale: false,
    // hidFeme:true,

    weigh: 0,
    air: 0,
    jump: 0,
    long: 0,
    pull: 0,
    short_run: 0,
    long_run: 0,
    upp: 0,
    feRun: 0,

    total: 0.00,
  },
  sexChange(e) {
    if (e.detail.value == 0) {
      this.setData({
        hidMale: false
      })
    }
    else {
      this.setData({
        hidMale: true
      })
    }
    this.setData({
      sexValue: e.detail.value
    })
  },
  ageChange(e) {
    age = e.detail.value
  },
  input(e) {
    let id = e.currentTarget.id
    // 男  大一||大二
    if (this.data.sexValue == 0 && (age == "1" || age == "2")) {
      if (id == 0) {
        height = Number(e.detail.value)
      }
      else if (id == 1) {
        let grage = Number(e.detail.value)
        let bmi = grage / ((height / 100) * (height / 100))
        bmi = bmi.toFixed(1)
        console.log(bmi);
        if (bmi <= 17.8 || (bmi >= 24 && bmi <= 27.9)) {
          this.setData({
            weigh: 80
          })
        }
        else if (bmi >= 17.9 && bmi <= 23.9) {
          this.setData({
            weigh: 100
          })
        }
        else if (bmi >= 28) {
          this.setData({
            weigh: 60
          })
        }
      }
      // 肺活量
      else if (id == 2) {
        let grade = Number(e.detail.value)
        if (2300 <= grade && grade < 3100) {
          this.setData({
            air: (60 - (((3100 - grade) / 160) * 10)) - ((60 - (((3100 - grade) / 160) * 10)) % 10)
          })
        }
        else if (3100 <= grade && grade < 4300) {
          this.setData({
            air: (80 - (((4300 - grade) / 120) * 2)) - ((80 - (((4300 - grade) / 120) * 2)) % 2)
          })
        }
        else if (4300 <= grade && grade < 4800) {
          if (4300 <= grade && grade < 4550) {
            this.setData({
              air: 80
            })
          }
          else {
            this.setData({
              air: 85
            })
          }
        }
        else if (4800 <= grade && grade < 5040) {
          this.setData({
            air: (100 - ((5040 - e.detail.value) / 120) * 5) - ((100 - ((5040 - e.detail.value) / 120) * 5) % 5)
          })
        }
        else if (grade >= 5040) {
          this.setData({
            air: 100
          })
        }
        else {
          this.setData({
            air: 0
          })
        }
      }
      // 立定跳远
      else if (id == 3) {
        let grade = Number(e.detail.value)
        if (183 <= grade && 208 > grade) {
          this.setData({
            jump: (60 - ((208 - grade) / 5) * 10) - ((60 - ((208 - grade) / 5) * 10) % 10)
          })
        }
        else if (208 <= grade && 248 > grade) {
          this.setData({
            jump: (80 - ((248 - grade) / 4) * 2) - ((80 - ((248 - grade) / 4) * 2) % 2)
          })
        }
        else if (248 <= grade && 263 > grade) {
          if (grade >= 248 && grade < 256) {
            this.setData({
              jump: 80
            })
          }
          else {
            this.setData({
              jump: 85
            })
          }
        }
        else if (263 <= grade && 273 > grade) {
          this.setData({
            jump: (100 - ((273 - grade) / 5) * 5) - ((100 - ((273 - grade) / 5) * 5) % 5)
          })
        }
        else if (grade >= 273) {
          this.setData({
            jump: 100
          })
        }
        else {
          this.setData({
            jump: 0
          })
        }
      }
      // 坐位体前屈
      else if (id == 4) {
        let grade = Number(e.detail.value)
        if (grade >= -1.3 && grade < 3.7) {
          this.setData({
            long: (60 - ((3.7 - grade) / 1) * 10) - ((60 - ((3.7 - grade) / 1) * 10) % 10)
          })
        }
        else if (grade >= 3.7 && grade < 17.7) {
          this.setData({
            long: (80 - ((17.7 - grade) / 1.4) * 2) - ((80 - ((17.7 - grade) / 1.4) * 2) % 2)
          })
        }
        else if (grade >= 17.7 && grade < 21.3) {
          if (grade >= 17.7 && grade < 19.5) {
            this.setData({
              long: 80
            })
          }
          else {
            this.setData({
              long: 85
            })
          }
        }
        else if (grade >= 21.3 && grade < 24.9) {
          this.setData({
            long: (100 - ((24.9 - grade) / 1.8) * 5) - ((100 - ((24.9 - grade) / 1.8) * 5) % 5)
          })
        }
        else if (grade >= 24.9) {
          this.setData({
            long: 100
          })
        }
        else {
          this.setData({
            long: 0
          })
        }
      }
      // 引体向上
      else if (id == 5) {
        let grade = Number(e.detail.value)
        if (grade >= 5 && grade < 10) {
          this.setData({
            pull: 60 - (10 - grade) * 10
          })
        }
        else if (grade >= 10 && grade < 15) {
          this.setData({
            pull: 80 - (15 - grade) * 4
          })
        }
        else if (grade >= 15 && grade < 17) {
          if (grade == 15) {
            this.setData({
              pull: 80
            })
          }
          else {
            this.setData({
              pull: 85
            })
          }
        }
        else if (grade >= 17 && grade < 19) {
          this.setData({
            pull: 100 - (19 - grade) * 5
          })
        }
        else if (grade >= 19) {
          this.setData({
            pull: 100
          })
        }
        else {
          this.setData({
            pull: 0
          })
        }
      }
      // 50米
      else if (id == 6) {
        let grade = Number(e.detail.value)
        if (grade <= 10.1 && grade > 9.1) {
          this.setData({
            short_run: (10 + ((10.1 - grade) / 0.2) * 10) - ((10 + ((10.1 - grade) / 0.2) * 10) % 10)
          })
        }
        else if (grade <= 9.1 && grade > 7.1) {
          this.setData({
            short_run: (60 + ((9.1 - grade) / 0.2) * 2) - ((60 + ((9.1 - grade) / 0.2) * 2) % 2)
          })
        }
        else if (grade <= 7.1 && grade > 6.9) {
          if (grade <= 7.1 && grade > 7) {
            this.setData({
              short_run: 80
            })
          }
          else {
            this.setData({
              short_run: 85
            })
          }
        }
        else if (grade <= 6.9 && grade > 6.7) {
          this.setData({
            short_run: (100 - ((6.7 - grade) / 0.1) * 5) - ((100 - ((6.7 - grade) / 0.1) * 5) % 5)
          })
        }
        else if (grade >= 0 && grade <= 6.7) {
          this.setData({
            short_run: 100
          })
        }
        else {
          this.setData({
            short_run: 0
          })
        }
      }
      // 1000米
      else if (id == 7) {
        min = Number(e.detail.value * 60)
      }
      else if (id == 8) {
        let grade = Number(e.detail.value) + min
        // console.log(grade);
        if (grade <= 372 && grade > 272) {
          this.setData({
            long_run: (10 + ((372 - grade) / 20) * 10) - ((10 + ((372 - grade) / 20) * 10) % 10)
          })
        }
        else if (grade <= 272 && grade > 222) {
          this.setData({
            long_run: (60 + ((272 - grade) / 5) * 2) - ((60 + ((272 - grade) / 5) * 2) % 2)
          })
        }
        else if (grade <= 222 && grade > 207) {
          if (grade <= 222 && grade > 214) {
            this.setData({
              long_run: 80
            })
          }
          else {
            this.setData({
              long_run: 85
            })
          }
        }
        else if (grade <= 207 && grade > 197) {
          this.setData({
            long_run: (100 - ((207 - grade) / 5) * 5) - ((100 - ((207 - grade) / 5) * 5) % 5)
          })
        }
        else if (grade >= 0 && grade < 197) {
          this.setData({
            long_run: 100
          })
        }
        else {
          this.setData({
            long_run: 0
          })
        }
      }
    }
    // 男  大三||大四
    else if (this.data.sexValue == 0 && (age == "3" || age == "4")) {
      if (id == 0) {
        height = Number(e.detail.value)
      }
      else if (id == 1) {
        let grage = Number(e.detail.value)
        let bmi = grage / ((height / 100) * (height / 100))
        // bmi = bmi.toFixed(1)
        console.log(bmi);
        if (bmi <= 17.8 || (bmi >= 24 && bmi <= 27.9)) {
          this.setData({
            weigh: 80
          })
        }
        else if (bmi >= 17.9 && bmi <= 23.9) {
          this.setData({
            weigh: 100
          })
        }
        else if (bmi >= 28) {
          this.setData({
            weigh: 60
          })
        }
      }
      // 肺活量
      else if (id == 2) {
        let grade = Number(e.detail.value)
        // console.log(grade);
        if (2350 <= grade && grade < 3200) {
          this.setData({
            air: (60 - (((3200 - grade) / 170) * 10)) - ((60 - (((3200 - grade) / 170) * 10)) % 10)
          })
        }
        else if (3200 <= grade && grade < 4400) {
          this.setData({
            air: (80 - (((4400 - grade) / 120) * 2)) - ((80 - (((4400 - grade) / 120) * 2)) % 2)
          })
        }
        else if (4400 <= grade && grade < 4900) {
          if (4400 <= grade && grade < 4650) {
            this.setData({
              air: 80
            })
          }
          else {
            this.setData({
              air: 85
            })
          }
        }
        else if (4900 <= grade && grade < 5140) {
          this.setData({
            air: (100 - ((5140 - e.detail.value) / 120) * 5) - ((100 - ((5140 - e.detail.value) / 120) * 5) % 5)
          })
        }
        else if (grade >= 5140) {
          this.setData({
            air: 100
          })
        }
        else {
          this.setData({
            air: 0
          })
        }
      }
      // 立定跳远
      else if (id == 3) {
        let grade = Number(e.detail.value)
        if (185 <= grade && 210 > grade) {
          this.setData({
            jump: (60 - ((210 - grade) / 5) * 10) - ((60 - ((210 - grade) / 5) * 10) % 10)
          })
        }
        else if (210 <= grade && 240 > grade) {
          this.setData({
            jump: (80 - ((250 - grade) / 4) * 2) - ((80 - ((250 - grade) / 4) * 2) % 2)
          })
        }
        else if (250 <= grade && 265 > grade) {
          if (grade >= 250 && grade < 259) {
            this.setData({
              jump: 80
            })
          }
          else {
            this.setData({
              jump: 85
            })
          }
        }
        else if (265 <= grade && 275 > grade) {
          this.setData({
            jump: (100 - ((275 - grade) / 5) * 5) - ((100 - ((275 - grade) / 5) * 5) % 5)
          })
        }
        else if (grade >= 275) {
          this.setData({
            jump: 100
          })
        }
        else {
          this.setData({
            jump: 0
          })
        }
      }
      // 坐位体前屈
      else if (id == 4) {
        let grade = Number(e.detail.value)
        if (grade >= -0.8 && grade < 4.2) {
          this.setData({
            long: (60 - ((4.2 - grade) / 1) * 10) - ((60 - ((4.2 - grade) / 1) * 10) % 10)
          })
        }
        else if (grade >= 4.2 && grade < 18.2) {
          this.setData({
            long: (80 - ((18.2 - grade) / 1.4) * 2) - ((80 - ((18.2 - grade) / 1.4) * 2) % 2)
          })
        }
        else if (grade >= 18.2 && grade < 21.5) {
          if (grade >= 18.2 && grade < 19.9) {
            this.setData({
              long: 80
            })
          }
          else {
            this.setData({
              long: 85
            })
          }
        }
        else if (grade >= 21.5 && grade < 25.1) {
          this.setData({
            long: (100 - ((25.1 - grade) / 1.8) * 5) - ((100 - ((25.1 - grade) / 1.8) * 5) % 5)
          })
        }
        else if (grade >= 25.1) {
          this.setData({
            long: 100
          })
        }
        else {
          this.setData({
            long: 0
          })
        }
      }
      // 引体向上
      else if (id == 5) {
        let grade = Number(e.detail.value)
        if (grade >= 6 && grade < 11) {
          this.setData({
            pull: 60 - (10 - grade) * 10
          })
        }
        else if (grade >= 11 && grade < 16) {
          this.setData({
            pull: 80 - (15 - grade) * 4
          })
        }
        else if (grade >= 16 && grade < 18) {
          if (grade == 16) {
            this.setData({
              pull: 80
            })
          }
          else {
            this.setData({
              pull: 85
            })
          }
        }
        else if (grade >= 18 && grade < 20) {
          this.setData({
            pull: 100 - (20 - grade) * 5
          })
        }
        else {
          this.setData({
            pull: 0
          })
        }
      }
      // 50米
      else if (id == 6) {
        let grade = Number(e.detail.value)
        if (grade <= 10 && grade > 9) {
          this.setData({
            short_run: (10 + ((10 - grade) / 0.2) * 10) - ((10 + ((10 - grade) / 0.2) * 10) % 10)
          })
        }
        else if (grade <= 9 && grade > 7) {
          this.setData({
            short_run: (60 + ((9 - grade) / 0.2) * 2) - ((60 + ((9 - grade) / 0.2) * 2) % 2)
          })
        }
        else if (grade <= 7 && grade > 6.8) {
          if (grade <= 7 && grade > 6.9) {
            this.setData({
              short_run: 80
            })
          }
          else {
            this.setData({
              short_run: 85
            })
          }
        }
        else if (grade <= 6.8 && grade > 6.6) {
          this.setData({
            short_run: (100 - ((6.6 - grade) / 0.1) * 5) - ((100 - ((6.6 - grade) / 0.1) * 5) % 5)
          })
        }
        else if (grade >= 0 && grade <= 6.6) {
          this.setData({
            short_run: 100
          })
        }
        else {
          this.setData({
            short_run: 0
          })
        }
      }
      // 1000米
      else if (id == 7) {
        min = Number(e.detail.value * 60)
      }
      else if (id == 8) {
        let grade = Number(e.detail.value) + min
        console.log(grade);
        if (grade <= 370 && grade > 270) {
          this.setData({
            long_run: (10 + ((370 - grade) / 20) * 10) - ((10 + ((370 - grade) / 20) * 10) % 10)
          })
        }
        else if (grade <= 270 && grade > 220) {
          this.setData({
            long_run: (60 + ((270 - grade) / 5) * 2) - ((60 + ((270 - grade) / 5) * 2) % 2)
          })
        }
        else if (grade <= 220 && grade > 205) {
          if (grade <= 220 && grade > 212) {
            this.setData({
              long_run: 80
            })
          }
          else {
            this.setData({
              long_run: 85
            })
          }
        }
        else if (grade <= 205 && grade > 195) {
          this.setData({
            long_run: (100 - ((205 - grade) / 5) * 5) - ((100 - ((205 - grade) / 5) * 5) % 5)
          })
        }
        else if (grade >= 0 && grade < 195) {
          this.setData({
            long_run: 100
          })
        }
        else {
          this.setData({
            long_run: 0
          })
        }
      }
    }
    // 女  大一||大二
    else if (this.data.sexValue == 1 && (age == "1" || age == "2")) {
      if (id == 0) {
        height = Number(e.detail.value)
      }
      else if (id == 1) {
        let grage = Number(e.detail.value)
        let bmi = grage / ((height / 100) * (height / 100))
        bmi = bmi.toFixed(1)
        if (bmi <= 17.1 || (bmi >= 24 && bmi <= 27.9)) {
          this.setData({
            weigh: 80
          })
        }
        else if (bmi >= 17.2 && bmi <= 23.9) {
          this.setData({
            weigh: 100
          })
        }
        else if (bmi >= 28) {
          this.setData({
            weigh: 60
          })
        }
      }
      // 肺活量
      else if (id == 2) {
        let grade = Number(e.detail.value)
        // console.log(grade);
        if (1800 <= grade && grade < 2000) {
          this.setData({
            air: (60 - (((2000 - grade) / 40) * 10)) - ((60 - (((2000 - grade) / 40) * 10)) % 10)
          })
        }
        else if (2000 <= grade && grade < 3000) {
          this.setData({
            air: (80 - (((3000 - grade) / 100) * 2)) - ((80 - (((3000 - grade) / 100) * 2)) % 2)
          })
        }
        else if (3000 <= grade && grade < 3300) {
          if (3000 <= grade && grade < 3150) {
            this.setData({
              air: 80
            })
          }
          else {
            this.setData({
              air: 85
            })
          }
        }
        else if (3300 <= grade && grade < 3400) {
          this.setData({
            air: (100 - ((3400 - e.detail.value) / 50) * 5) - ((100 - ((3400 - e.detail.value) / 50) * 5) % 5)
          })
        }
        else if (grade >= 3400) {
          this.setData({
            air: 100
          })
        }
        else {
          this.setData({
            air: 0
          })
        }
      }
      // 立定跳远
      else if (id == 3) {
        let grade = Number(e.detail.value)
        if (126 <= grade && 151 > grade) {
          this.setData({
            jump: (60 - ((151 - grade) / 5) * 10) - ((60 - ((151 - grade) / 5) * 10) % 10)
          })
        }
        else if (151 <= grade && 181 > grade) {
          this.setData({
            jump: (80 - ((181 - grade) / 3) * 2) - ((80 - ((181 - grade) / 3) * 2) % 2)
          })
        }
        else if (181 <= grade && 195 > grade) {
          if (grade >= 181 && grade < 188) {
            this.setData({
              jump: 80
            })
          }
          else {
            this.setData({
              jump: 85
            })
          }
        }
        else if (195 <= grade && 207 > grade) {
          this.setData({
            jump: (100 - ((207 - grade) / 5) * 5) - ((100 - ((207 - grade) / 5) * 5) % 5)
          })
        }
        else if (grade >= 207) {
          this.setData({
            jump: 100
          })
        }
        else {
          this.setData({
            jump: 0
          })
        }
      }
      // 坐位体前屈
      else if (id == 4) {
        let grade = Number(e.detail.value)
        if (grade >= 2 && grade < 6) {
          this.setData({
            long: (60 - ((6 - grade) / 0.8) * 10) - ((60 - ((6 - grade) / 0.8) * 10) % 10)
          })
        }
        else if (grade >= 6 && grade < 19) {
          this.setData({
            long: (80 - ((19 - grade) / 1.3) * 2) - ((80 - ((19 - grade) / 1.3) * 2) % 2)
          })
        }
        else if (grade >= 19 && grade < 22.2) {
          if (grade >= 19 && grade < 20.6) {
            this.setData({
              long: 80
            })
          }
          else {
            this.setData({
              long: 85
            })
          }
        }
        else if (grade >= 22.2 && grade < 25.8) {
          this.setData({
            long: (100 - ((25.8 - grade) / 1.8) * 5) - ((100 - ((25.8 - grade) / 1.8) * 5) % 5)
          })
        }
        else if (grade >= 25.8) {
          this.setData({
            long: 100
          })
        }
        else {
          this.setData({
            long: 0
          })
        }
      }
      // 50米
      else if (id == 6) {
        let grade = Number(e.detail.value)
        if (grade <= 11.3 && grade > 10.3) {
          this.setData({
            short_run: (10 + ((11.3 - grade) / 0.2) * 10) - ((10 + ((11.3 - grade) / 0.2) * 10) % 10)
          })
        }
        else if (grade <= 10.3 && grade > 8.3) {
          this.setData({
            short_run: (60 + ((10.3 - grade) / 0.2) * 2) - ((60 + ((10.3 - grade) / 0.2) * 2) % 2)
          })
        }
        else if (grade <= 8.3 && grade > 7.7) {
          if (grade <= 8.3 && grade > 8) {
            this.setData({
              short_run: 80
            })
          }
          else {
            this.setData({
              short_run: 85
            })
          }
        }
        else if (grade <= 7.7 && grade > 7.5) {
          this.setData({
            short_run: (100 - ((7.7 - grade) / 0.1) * 5) - ((100 - ((7.7 - grade) / 0.1) * 5) % 5)
          })
        }
        else if (grade >= 0 && grade <= 7.5) {
          this.setData({
            short_run: 100
          })
        }
        else {
          this.setData({
            short_run: 0
          })
        }
      }
      // 仰卧起坐
      else if (id == 9) {
        let grade = Number(e.detail.value)
        if (grade >= 16 && grade < 26) {
          this.setData({
            upp: (60 - ((26 - grade) / 2) * 10) - ((60 - ((26 - grade) / 2) * 10) % 10)
          })
        }
        else if (grade >= 26 && grade < 46) {
          this.setData({
            upp: (80 - ((46 - grade) / 2) * 2) - ((80 - ((46 - grade) / 2) * 2) % 2)
          })
        }
        else if (grade >= 46 && grade < 52) {
          if (grade >= 46 && grade < 49) {
            this.setData({
              upp: 80
            })
          }
          else {
            this.setData({
              upp: 85
            })
          }
        }
        else if (grade >= 52 && grade < 56) {
          this.setData({
            upp: (100 - ((56 - grade) / 2) * 5) - ((100 - ((56 - grade) / 2) * 5) % 5)
          })
        }
        else if (grade >= 56) {
          this.setData({
            upp: 100
          })
        }
        else {
          this.setData({
            upp: 0
          })
        }
      }
      // 800mi
      else if (id == 10) {
        feMin = Number(e.detail.value) * 60
      }
      else if (id == 11) {
        let grade = feMin + Number(e.detail.value)
        if (grade <= 324 && grade > 274) {
          this.setData({
            feRun: (10 + ((324 - grade) / 10) * 10) - ((10 + ((324 - grade) / 10) * 10) % 10)
          })
        }
        else if (grade <= 274 && grade > 224) {
          this.setData({
            feRun: (60 + ((274 - grade) / 5) * 2) - ((60 + ((274 - grade) / 5) * 2) % 2)
          })
        }
        else if (grade <= 224 && grade > 220) {
          if (grade <= 224 && grade > 217) {
            this.setData({
              feRun: 80
            })
          }
          else {
            this.setData({
              feRun: 80
            })
          }
        }
        else if (grade <= 210 && grade > 198) {
          this.setData({
            feRun: (100 - ((210 - grade) / 6) * 5) - ((100 - ((210 - grade) / 6) * 5) % 5)
          })
        }
        else if (grade <= 198) {
          this.setData({
            feRun: 100
          })
        }
        else {
          this.setData({
            feRun: 0
          })
        }
      }
    }
    // 女 大三||大四
    else if (this.data.sexValue == 1 && (age == "3" || age == "4")) {
      if (id == 0) {
        height = Number(e.detail.value)
      }
      else if (id == 1) {
        let grage = Number(e.detail.value)
        let bmi = grage / ((height / 100) * (height / 100))
        bmi = bmi.toFixed(1)
        if (bmi <= 17.1 || (bmi >= 24 && bmi <= 27.9)) {
          this.setData({
            weigh: 80
          })
        }
        else if (bmi >= 17.2 && bmi <= 23.9) {
          this.setData({
            weigh: 100
          })
        }
        else if (bmi >= 28) {
          this.setData({
            weigh: 60
          })
        }
      }
      // 肺活量
      else if (id == 2) {
        let grade = Number(e.detail.value)
        // console.log(grade);
        if (1850 <= grade && grade < 2050) {
          this.setData({
            air: (60 - (((2050 - grade) / 40) * 10)) - ((60 - (((2050 - grade) / 40) * 10)) % 10)
          })
        }
        else if (2050 <= grade && grade < 3050) {
          this.setData({
            air: (80 - (((3050 - grade) / 100) * 2)) - ((80 - (((3050 - grade) / 100) * 2)) % 2)
          })
        }
        else if (3050 <= grade && grade < 3350) {
          if (3050 <= grade && grade < 3200) {
            this.setData({
              air: 80
            })
          }
          else {
            this.setData({
              air: 85
            })
          }
        }
        else if (3350 <= grade && grade < 3450) {
          this.setData({
            air: (100 - ((3400 - e.detail.value) / 50) * 5) - ((100 - ((3400 - e.detail.value) / 50) * 5) % 5)
          })
        }
        else if (grade >= 3450) {
          this.setData({
            air: 100
          })
        }
        else {
          this.setData({
            air: 0
          })
        }
      }
      // 立定跳远
      else if (id == 3) {
        let grade = Number(e.detail.value)
        if (127 <= grade && 152 > grade) {
          this.setData({
            jump: (60 - ((152 - grade) / 5) * 10) - ((60 - ((152 - grade) / 5) * 10) % 10)
          })
        }
        else if (152 <= grade && 182 > grade) {
          this.setData({
            jump: (80 - ((182 - grade) / 3) * 2) - ((80 - ((182 - grade) / 3) * 2) % 2)
          })
        }
        else if (182 <= grade && 196 > grade) {
          if (grade >= 182 && grade < 189) {
            this.setData({
              jump: 80
            })
          }
          else {
            this.setData({
              jump: 85
            })
          }
        }
        else if (196 <= grade && 208 > grade) {
          this.setData({
            jump: (100 - ((208 - grade) / 5) * 5) - ((100 - ((208 - grade) / 5) * 5) % 5)
          })
        }
        else if (grade >= 208) {
          this.setData({
            jump: 100
          })
        }
        else {
          this.setData({
            jump: 0
          })
        }
      }
      // 坐位体前屈
      else if (id == 4) {
        let grade = Number(e.detail.value)
        if (grade >= 2.5 && grade < 6.5) {
          this.setData({
            long: (60 - ((6.5 - grade) / 0.8) * 10) - ((60 - ((6.5 - grade) / 0.8) * 10) % 10)
          })
        }
        else if (grade >= 6.5 && grade < 19.5) {
          this.setData({
            long: (80 - ((19.5 - grade) / 1.3) * 2) - ((80 - ((19.5 - grade) / 1.3) * 2) % 2)
          })
        }
        else if (grade >= 19.5 && grade < 22.4) {
          if (grade >= 19.5 && grade < 21) {
            this.setData({
              long: 80
            })
          }
          else {
            this.setData({
              long: 85
            })
          }
        }
        else if (grade >= 22.4 && grade < 26.3) {
          this.setData({
            long: (100 - ((26.3 - grade) / 2) * 5) - ((100 - ((26.3 - grade) / 2) * 5) % 5)
          })
        }
        else if (grade >= 26.3) {
          this.setData({
            long: 100
          })
        }
        else {
          this.setData({
            long: 0
          })
        }
      }
      // 50米
      else if (id == 6) {
        let grade = Number(e.detail.value)
        if (grade <= 11.2 && grade > 10.2) {
          this.setData({
            short_run: (10 + ((11.2 - grade) / 0.2) * 10) - ((10 + ((11.2 - grade) / 0.2) * 10) % 10)
          })
        }
        else if (grade <= 10.2 && grade > 8.2) {
          this.setData({
            short_run: (60 + ((10.2 - grade) / 0.2) * 2) - ((60 + ((10.2 - grade) / 0.2) * 2) % 2)
          })
        }
        else if (grade <= 8.2 && grade > 7.6) {
          if (grade <= 8.2 && grade > 7.9) {
            this.setData({
              short_run: 80
            })
          }
          else {
            this.setData({
              short_run: 85
            })
          }
        }
        else if (grade <= 7.6 && grade > 7.4) {
          this.setData({
            short_run: (100 - ((7.6 - grade) / 0.1) * 5) - ((100 - ((7.6 - grade) / 0.1) * 5) % 5)
          })
        }
        else if (grade >= 0 && grade <= 7.4) {
          this.setData({
            short_run: 100
          })
        }
        else {
          this.setData({
            short_run: 0
          })
        }
      }
      // 仰卧起坐
      else if (id == 9) {
        let grade = Number(e.detail.value)
        if (grade >= 17 && grade < 27) {
          this.setData({
            upp: (60 - ((27 - grade) / 2) * 10) - ((60 - ((27 - grade) / 2) * 10) % 10)
          })
        }
        else if (grade >= 27 && grade < 47) {
          this.setData({
            upp: (80 - ((47 - grade) / 2) * 2) - ((80 - ((47 - grade) / 2) * 2) % 2)
          })
        }
        else if (grade >= 47 && grade < 53) {
          if (grade >= 47 && grade < 50) {
            this.setData({
              upp: 80
            })
          }
          else {
            this.setData({
              upp: 85
            })
          }
        }
        else if (grade >= 53 && grade < 57) {
          this.setData({
            upp: (100 - ((57 - grade) / 2) * 5) - ((100 - ((57 - grade) / 2) * 5) % 5)
          })
        }
        else if (grade >= 57) {
          this.setData({
            upp: 100
          })
        }
        else {
          this.setData({
            upp: 0
          })
        }
      }
      // 800mi
      else if (id == 10) {
        feMin = Number(e.detail.value) * 60
      }
      else if (id == 11) {
        let grade = feMin + Number(e.detail.value)
        if (grade <= 322 && grade > 272) {
          this.setData({
            feRun: (10 + ((322 - grade) / 10) * 10) - ((10 + ((322 - grade) / 10) * 10) % 10)
          })
        }
        else if (grade <= 272 && grade > 222) {
          this.setData({
            feRun: (60 + ((272 - grade) / 5) * 2) - ((60 + ((272 - grade) / 5) * 2) % 2)
          })
        }
        else if (grade <= 222 && grade > 218) {
          if (grade <= 222 && grade > 215) {
            this.setData({
              feRun: 80
            })
          }
          else {
            this.setData({
              feRun: 80
            })
          }
        }
        else if (grade <= 208 && grade > 196) {
          this.setData({
            feRun: (100 - ((208 - grade) / 6) * 5) - ((100 - ((208 - grade) / 6) * 5) % 5)
          })
        }
        else if (grade <= 196) {
          this.setData({
            feRun: 100
          })
        }
        else {
          this.setData({
            feRun: 0
          })
        }
      }
    }

  },
  avg() {
    let data = this.data
    if (this.data.sexValue == 0) {
      let ManAvg = ((data.weigh * 0.15 + data.air * 0.15 + data.jump * 0.1 + data.long * 0.1 + data.pull * 0.1 + data.short_run * 0.2 + data.long_run * 0.2)).toFixed(2)
      this.setData({
        total: ManAvg
      })
    }
    else {
      console.log(data.weigh, data.air, data.jump, data.long, data.feRun, data.upp, data.short_run);
      let WoMenAvg = ((data.weigh * 0.15 + data.air * 0.15 + data.jump * 0.1 + data.long * 0.1 + data.feRun * 0.2 + data.upp * 0.1 + data.short_run * 0.2)).toFixed(2)
      this.setData({
        total: WoMenAvg
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})