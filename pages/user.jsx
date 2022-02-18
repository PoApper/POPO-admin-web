import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Pagination } from 'semantic-ui-react'
import LayoutMain from '../components/layout.main'
import UserTable from '../components/user/user.table'
import UserCreateModal from '../components/user/user.create.modal'

const UserPage = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [total_count, setTotalCount] = useState(0)
  const page_size = 10

  useEffect(() => {
    try {
      axios.get(
        `${process.env.NEXT_PUBLIC_API}/user?take=${page_size}`,
        { withCredentials: true }).then((res) => {
        setUsers(res.data)
      })
      axios.get(
        `${process.env.NEXT_PUBLIC_API}/user/count`,
      ).then((res) => {
        setTotalCount(res.data)
      })
    } catch (err) {
      alert('유저 목록을 불러오는데 실패했습니다.')
      console.log(err)
    }
  }, [])

  const handlePageChange = async (e, target) => {
    const activePage = target.activePage
    const ret = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/user?take=${page_size}&skip=${page_size *
      (activePage - 1)}`, { withCredentials: true })
    setUsers(ret.data)
    setPage(activePage)
  }

  return (
    <LayoutMain>
      <h2>유저 관리</h2>
      <div style={{ marginBottom: '1rem' }}>
        <UserCreateModal
          trigger={<Button>유저 생성</Button>}
        />
      </div>
      <p>
        유저는 마지막 로그인 순으로 정렬되어 표시됩니다!
      </p>
      <div>
        <UserTable
          users={users}
          startIdx={(page - 1) * page_size}
        />
        <div style={{ display: 'flex' }}>
          <Pagination
            style={{ margin: '0 auto' }}
            activePage={page}
            totalPages={Math.ceil(total_count / page_size)}
            prevItem={null} nextItem={null}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </LayoutMain>
  )
}

export default UserPage