import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import TimelineBlock from "./TimelineBlock";
import { TimelineSegment } from "./timelineTypes";


const segments: TimelineSegment[] = [
  {
    id: "tl-1",
    order: 1,
    fromYear: "1981",
    toYear: "1986",
    category: "Космос",
    events: [
      {
        id: "e1",
        year: "1981",
        description: "Первый полет 'Спэйс шаттл Колумбия' - начало эры многоразовых космических аппаратов."
      },
      {
        id: "e2",
        year: "1982",
        description: "Салют-7 - запуск новой орбитальной станции, которая проработала на орбите более 15 лет."
      },
      {
        id: "e3",
        year: "1986",
        description: "Катастрофа шаттла 'Челленджер' в результате взрыва внешнего топливного бака."
      },
      {
        id: "e4",
        year: "1986",
        description: "Сборка МКС - СССР и США начали сотрудничество по проекту МКС."
      }
    ]
  },
  {
    id: "tl-2",
    order: 2,
    fromYear: "1987",
    toYear: "1991",
    category: "Кино", 
    events: [
      {
        id: "e6",
        year: "1987",
        description: "Хищник/Predator, США (реж. Джон Мактирнан)."
      },
      {
        id: "e7",
        year: "1988",
        description: "'Кто подставил кролика Роджера'/Who framed Rojer Rabbit, США (реж.Роберт Земекис)."
      },
      {
        id: "e8",
        year: "1989",
        description: "'Назад в будущее 2'/Back To The Future 2, США (реж. Роберт Земекис)."
      },
      {
        id: "e9",
        year: "1990",
        description: "'Крепкий орешек 2'/Die Hard 2, США(реж. Ренни Харлин)."
      },
      {
        id: "e10",
        year: "1991",
        description: "'Семейка Аддамс'/The Addams Family, США, (реж. Барри Зонненфильд)."
      }
    ]
  },
  {
    id: "tl-3",
    order: 3,
    fromYear: "1992",
    toYear: "1997",
    category: "Литература",
    events: [
      {
        id: "e11",
        year: "1992",
        description: "Нобелевская премия по литературе - Дерек Уолкотт, 'За блестящий образец карибского эпоса в 64 раздел'."
      },
      {
        id: "e12",
        year: "1994",
        description: "'Бессоница' - роман Стивена Кинга."
      },
      {
        id: "e13",
        year: "1995",
        description: "Нобелевская премия по литературе - Шеймас Хини."
      },
      {
        id: "e14",
        year: "1997",
        description: "Выход книги Джоан Роулинг 'Гарри Поттер и филосовский камень'."
      }
    ]
  },
  {
    id: "tl-4",
    order: 4,
    fromYear: "1999",
    toYear: "2004",
    category: "Театры",
    events: [
      {
        id: "e16",
        year: "1999",
        description: "Премьера балета 'Золушка' в постановке Жан-Кристофа Майо, сценография Эрнеста Пиньона."
      },
      {
        id: "e17",
        year: "2000",
        description: "Возобновлено издание журанла 'Театр'."
      },
      {
        id: "e18",
        year: "2002",
        description: "Примьера трилогии Тома Стоппарда 'Берег Утопии', Королевский Национальный театр, Лондон."
      },
      {
        id: "e19",
        year: "2004",
        description: "Премьера 'Мнимый больной' в Малом театре (Постановка Сергея Женовача)."
      }
    ]
  },
  {
    id: "tl-5",
    order: 5,
    fromYear: "2008",
    toYear: "2014",
    category: "Спорт",
    events: [
      {
        id: "e21",
        year: "2008",
        description: "XXIX Летние Олимпийские игры в Пекине."
      },
      {
        id: "e22",
        year: "2010",
        description: "Чемпионат мира по футболу FIFA 2010 в Испании."
      },
      {
        id: "e23",
        year: "2012",
        description: "Летние Олимпийские игры в Лондоне."
      },
      {
        id: "e24",
        year: "2013",
        description: "Всемирные студенческие игры в России."
      },
      {
        id: "e25",
        year: "2014",
        description: "Чемпионат мира по футболу FIFA 2014 в Бразилии."
      }
    ]
  },
  {
    id: "tl-6",
    order: 6,
    fromYear: "2015", 
    toYear: "2022",
    category: "Наука",
    events: [
      {
        id: "e26",
        year: "2015",
        description: "13 сентября - частное солнечное затмение, видимое в Южной Африке и части Антарктиды."
      },
      {
        id: "e27",
        year: "2016",
        description: "Телескоп 'Хаббл' обнаружил самую удаленную из всех обнаруженных галактик, получившую обозначение GN-z11."
      },
      {
        id: "e28",
        year: "2017",
        description: "Компания Tesla официально рпедставила первый в мире электрический грузовик Tesla Semi."
      },
      {
        id: "e29",
        year: "2018",
        description: "Старт космического корабля Solar Probe Plus, предназначенного для изучения Солнца."
      },
      {
        id: "e30",
        year: "2019",
        description: "Google объявил о создании 53-кубитного квантового компьютера."
      },
      {
        id: "e31",
        year: "2020",
        description: "Корабль Crew Dragon вернулся на землю из первого пилотируемого полета."
      }
    ]
  }
];

const App: React.FC = () => {
  return (
    <div className="app">
        <TimelineBlock segments={segments} />
    </div>
  );
};

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
