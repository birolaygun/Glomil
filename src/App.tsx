import "./scss/styles.css";
import { useState } from "react";
import { useFormik } from "formik";
import validationSchema from "./val/Validasyon";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {

  const [list, setList] = useState<Listed[]>([]);

  interface Listed {
    name: string;
    gender: string;
    group: string;
    enter: string;
    escape: string;
    workTime: number;
    id: number;
  }

  var today: any = new Date();
  var dd: any = today.getDate();
  var mm: any = today.getMonth() + 1;
  var yyyy: any = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;

  const avarage = (gen: string) => {
    const toplam = list
      .filter((fml) => fml.gender === gen)
      .map((prs) => prs.workTime);
    if (toplam.length === 0) {
      return 0;
    } else {
      const reducer = function (a: any, b: any) {
        return a + b;
      };
      const sum = toplam.reduce(reducer, 0);
      let len = Math.floor(
        sum /
          list.filter((fml) => fml.gender === gen).length /
          (1000 * 60 * 60 * 24)
      );
      return len;
    }
  };

  let femaleAvarage = avarage("kadın");
  let maleAvarage = avarage("erkek");

  let mini = (gen: string) => {
    if (list.filter((fml: any) => fml.gender === gen).length === 0) {
      return 0;
    } else {
      let val: any = 987787849998901;
      list
        .filter((fml: any) => fml.gender === gen)
        .map((fm: any) => fm.workTime)
        .forEach((element: number | Number) => {
          if (element < val) {
            val = element;
          }
        });
      return Math.floor(val / (1000 * 60 * 60 * 24));
    }
  };

  let femaleMin = mini("kadın");
  let maleMin = mini("erkek");

  let maxi = (gen: string) => {
    if (list.filter((fml: any) => fml.gender === gen).length === 0) {
      return 0;
    } else {
      let vali: any = 0;
      list
        .filter((fml: any) => fml.gender === gen)
        .map((fm: any) => fm.workTime)
        .forEach((element: number | Number) => {
          if (element > vali) {
            vali = element;
          }
        });

      return Math.floor(vali / (1000 * 60 * 60 * 24));
    }
  };

  let femaleMax = maxi("kadın");
  let maleMax = maxi("erkek");

  const avarageJob = (jb: string) => {
    const toplam = list
      .filter((fml) => fml.group === jb)
      .map((prs) => prs.workTime);
    if (toplam.length === 0) {
      return 0;
    } else {
      const reducer = function (a: any, b: any) {
        return a + b;
      };
      const sum = toplam.reduce(reducer, 0);
      let len = Math.floor(
        sum /
          list.filter((fml) => fml.group === jb).length /
          (1000 * 60 * 60 * 24)
      );
      return len;
    }
  };

  let yazılımAvarage = avarageJob("yazılım");
  let muhasebeAvarage = avarageJob("muhasebe");
  let destekAvarage = avarageJob("destek");
  let yönetimAvarage = avarageJob("yönetim");
  let analizAvarage = avarageJob("analiz");

  let miniJob = (jb: string) => {
    if (list.filter((fml: any) => fml.group === jb).length === 0) {
      return 0;
    } else {
      let val: any = 987787849998901;
      list
        .filter((fml: any) => fml.group === jb)
        .map((fm: any) => fm.workTime)
        .forEach((element: number | Number) => {
          if (element < val) {
            val = element;
          }
        });

      return Math.floor(val / (1000 * 60 * 60 * 24));
    }
  };

  let yazılımMin = miniJob("yazılım");
  let muhasebeMin = miniJob("muhasebe");
  let destekMin = miniJob("destek");
  let yönetimMin = miniJob("yönetim");
  let analizMin = miniJob("analiz");

  let maxiJob = (jb: string) => {
    if (list.filter((fml: any) => fml.group === jb).length === 0) {
      return 0;
    } else {
      let vali: any = 0;
      list
        .filter((fml: any) => fml.group === jb)
        .map((fm: any) => fm.workTime)
        .forEach((element: number | Number) => {
          if (element > vali) {
            vali = element;
          }
        });
      return Math.floor(vali / (1000 * 60 * 60 * 24));
    }
  };

  let yazılımMaxi = maxiJob("yazılım");
  let muhasebeMaxi = maxiJob("muhasebe");
  let destekMaxi = maxiJob("destek");
  let yönetimMaxi = maxiJob("yönetim");
  let analizMaxi = maxiJob("analiz");

  const optionsJob = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Meslek Grubuna Göre Çalışma Günleri",
      },
    },
  };

  const labels = ["Ortalama", "En Uzun", "En Kısa"];

  const dataJob = {
    labels,
    datasets: [
      {
        label: "Destek",
        data: [destekAvarage, destekMaxi, destekMin],
        borderColor: "rgb(73, 255, 0)",
        backgroundColor: "rgb(73, 255, 0)",
      },
      {
        label: "Muhasebe",
        data: [muhasebeAvarage, muhasebeMaxi, muhasebeMin],
        borderColor: "rgb(251, 255, 0)",
        backgroundColor: "rgb(251, 255, 0)",
      },
      {
        label: "Analiz",
        data: [analizAvarage, analizMaxi, analizMin],
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgb(255, 0, 0)",
      },
      {
        label: "Yazılım",
        data: [yazılımAvarage, yazılımMaxi, yazılımMin],
        borderColor: "rgb(62, 0, 255)",
        backgroundColor: "rgb(62, 0, 255)",
      },
      {
        label: "Yönetim",
        data: [yönetimAvarage, yönetimMaxi, yönetimMin],
        borderColor: "rgb(240, 55, 165)",
        backgroundColor: "rgb(240, 55, 165)",
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Cinsiyete Göre Çalışma Günleri",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Kadın",
        data: [femaleAvarage, femaleMax, femaleMin],
        borderColor: "rgb(255,29,139)",
        backgroundColor: "rgb(255,29,139)",
      },
      {
        label: "Erkek",
        data: [maleAvarage, maleMax, maleMin],
        borderColor: "rgb(2,162,255)",
        backgroundColor: "rgb(2,162,255)",
      },
    ],
  };

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        gender: "",
        group: "",
        enter: "",
        escape: today,
      },

      onSubmit: async (values) => {
        let workTime =
          new Date(values.escape).getTime() - new Date(values.enter).getTime();

        await setList((data: any) => [
          ...data,
          {
            name: values.name,
            gender: values.gender,
            group: values.group,
            enter: values.enter,
            escape: values.escape,
            workTime: workTime,
            id: Math.random(),

          },
        ]);

        await resetForm();
      },
      validationSchema,
    });

  const resetForm = () => {
    values.name = "";
    values.gender = "";
    values.group = "";
    values.enter = "";
    values.escape = today;
    let myContainer = document.getElementById("group") as HTMLInputElement;
    myContainer.value = "";
  };

  return (
    <div className="App">
      <h1>GLOMIL</h1>

      <form onSubmit={handleSubmit} onReset={resetForm}>
        <div className="row">
          <div className="col-lg">
            {" "}
            <div className="row">
              <div className="col-sm-6 inForm">
                <label htmlFor="name">Ad Soyad:</label>
                <br />
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  type="name"
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                />

                {errors.name && touched.name && (
                  <div className="errors">{errors.name}</div>
                )}
              </div>
              <div className="col-sm-6 inForm">
                <label htmlFor="group">Grup:</label>
                <br />

                <select
                  data-placeholder="Seçiniz"
                  id="group"
                  name="group"
                  className="form-select"
                  onChange={handleChange}
                  defaultValue={values.group}
                  onBlur={handleBlur}
                >
                  <option disabled defaultValue="" value="">
                    Seçiniz
                  </option>
                  <option value="destek">Destek</option>
                  <option value="muhasebe">Muhasebe</option>
                  <option value="analiz">Analiz</option>
                  <option value="yazılım">Yazılım</option>
                  <option value="yönetim">Yönetim</option>
                </select>
                {errors.group && touched.group && (
                  <div className="errors">{errors.group}</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg">
            <div className="row">
              <div className="col-sm-4 inForm">
                <label htmlFor="Cinsiyet">Cinsiyet:</label>
                <br />
                <div className="genderRadio">
                  <div>
                    <label className="genderLabel" htmlFor="male">
                      Erkek
                    </label>

                    <input
                      onBlur={handleBlur}
                      onChange={handleChange}
                      checked={values.gender === "erkek"}
                      value="erkek"
                      type="radio"
                      name="gender"
                      id="male"
                    />
                  </div>
                  <div>
                    <label className="genderLabel" htmlFor="female">
                      Kadın
                    </label>

                    <input
                      onBlur={handleBlur}
                      onChange={handleChange}
                      checked={values.gender === "kadın"}
                      value="kadın"
                      type="radio"
                      name="gender"
                      id="female"
                    />
                  </div>
                </div>
                {errors.gender && touched.gender && (
                  <div className="errors">{errors.gender}</div>
                )}
              </div>
              <div className="col-sm-4 inForm">
                <label htmlFor="enter">İşe Giriş: </label>
                <br />
                <input
                  onBlur={handleBlur}
                  className="form-control"
                  onChange={handleChange}
                  value={values.enter}
                  type="date"
                  name="enter"
                  id="enter"
                  min="1899-01-01"
                  max={today && values.escape}
                />
                {errors.enter && touched.enter && (
                  <div className="errors">{errors.enter}</div>
                )}
              </div>
              <div className="col-sm-4 inForm">
                <label htmlFor="escape">İşten Çıkış: </label>
                <br />
                <input
                  defaultValue={today}
                  onBlur={handleBlur}
                  className="form-control"
                  onChange={handleChange}
                  type="date"
                  name="escape"
                  id="escape"
                  min={values.enter}
                  max={today}
                />

                {errors.escape && touched.escape && (
                  <div className="errors">{errors.escape}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-dark" type="submit">
          Ekle
        </button>{" "}
        <button className="btn btn-dark" type="reset">
          Temizle
        </button>
      </form>

      <div className={list.length ? "list row" : "list row d-none"}>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Personel Listesi
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="col-12">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Ad Soyad</th>
                      <th scope="col">Grup</th>
                      <th scope="col">Cinsiyet</th>
                      {/* <th scope="col">İşe Giriş</th>
              <th scope="col">İşten Çıkış</th> */}
                      <th scope="col">Çalışma Süresi</th>
                      <th scope="col">Sil</th>
                    </tr>
                  </thead>
                  {list.map((person, index) => {
                    let year = Math.floor(
                      person.workTime / (1000 * 60 * 60 * 24 * 365)
                    );
                    let month = Math.floor(
                      (person.workTime % (1000 * 60 * 60 * 24 * 365)) /
                        (1000 * 60 * 60 * 24 * 30)
                    );
                    let day = Math.floor(
                      ((person.workTime % (1000 * 60 * 60 * 24 * 365)) %
                        (1000 * 60 * 60 * 24 * 30)) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (
                      <tbody key={index + 1}>
                        <tr>
                          <th>{index + 1} </th>
                          <td>{person.name}</td>
                          <td>{person.group}</td>
                          <td>{person.gender}</td>
                          {/* <td>{person.enter}</td>
                  <td>{person.escape}</td> */}
                          <td>
                            <span className={year ? " " : "d-none "}>
                              {" "}
                              <span>{year}</span> yıl{" "}
                            </span>
                            <span className={month ? " " : "d-none "}>
                              {" "}
                              <span>{month}</span> ay{" "}
                            </span>
                            <span className={day ? " " : "d-none "}>
                              {" "}
                              <span>{day}</span> gün{" "}
                            </span>
                          </td>
                          <td>
                            <i
                              onClick={() => {
                                setList(
                                  list.filter((del) => del.id !== person.id)
                                );
                              }}
                              className="fas fa-user-times"
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart row">
        <div className="col-md-6">
          <Bar options={options} data={data} />
        </div>
        <div className="col-md-6">
          <Bar options={optionsJob} data={dataJob} />
        </div>
      </div>
    </div>
  );
}

export default App;
