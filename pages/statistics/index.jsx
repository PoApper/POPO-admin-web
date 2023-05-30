import LayoutMain from '../../components/layout.main'
import { Dropdown, List } from "semantic-ui-react";
import NewUserBar from '../../components/statistics/new-user.bar'
import NewReservationBar from '../../components/statistics/new-reservation.bar'
import { useState } from "react";

const YearOptions = [
  {
    key: 2021,
    text: '2021년',
    value: 2021,
  },
  {
    key: 2022,
    text: '2022년',
    value: 2022,
  },
  {
    key: 2023,
    text: '2023년',
    value: 2023,
  }
]

const StatisticsPage = () => {
  const [year, setYear] = useState(2023);

  return (
    <LayoutMain>
      <h2>POPO 통계</h2>
      <p>
        We don&apos;t have better algorithms, we just have more data.<br/>
        데이터를 통해 POPO를 유연하게 관리하고 활용해봅시다!
      </p>
      <div>
        <Dropdown
          placeholder={'Select Year'}
          options={YearOptions}
          value={year}
          onChange={(_, { value }) => {
            setYear(value)
          }}
        />
      </div>
      <h3>신규 유저</h3>
      <div style={{ height: 360 }}>
        <NewUserBar year={year}/>
      </div>
      <hr/>
      <h3>신규 예약</h3>
      <div style={{ height: 360 }}>
        <NewReservationBar year={year}/>
      </div>
      <hr/>
      <h3>ToDo List 🚀</h3>
      <List as="ul">
        <List.Item as="li">일일 활성 유저 (Daily Active User)</List.Item>
        <List.Item as="li">소개글 조회수</List.Item>
        <List.Item as="li">생활백서 조회수</List.Item>
      </List>
    </LayoutMain>
  )
}

export default StatisticsPage