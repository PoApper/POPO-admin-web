import { useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Image } from 'semantic-ui-react'
import styled from 'styled-components'

import LoginLayout from '@/components/layout.raw'
import { PoPoAxios } from '@/utils/axios.instance';

const LoginPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPW] = useState('')

  const handleLogin = async () => {
    try {
      await PoPoAxios.post('/auth/login/admin', {
        email: email,
        password: password,
      }, { withCredentials: true })
      await router.push('/')
    } catch (e) {
      alert('로그인에 실패했습니다.')
      console.log(e)
    }
  }

  return (
    <LoginLayout>
      <Image
        src={'/popo.svg'}
        alt={'popo-logo'}
      />
      <SubTitle>관리자 페이지</SubTitle>

      <LoginFormDiv>
        <Form>
          <Form.Input
            required
            label={'Email'}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Input
            required
            type={'password'}
            label={'비밀번호'}
            onChange={(e) => setPW(e.target.value)}
          />
          <Form.Button onClick={handleLogin}>
            로그인
          </Form.Button>
        </Form>
      </LoginFormDiv>

    </LoginLayout>
  )
}

export default LoginPage

const SubTitle = styled.h2`
  margin-top: 0;
  font-size: 26px !important;
  font-weight: 500;
`

const LoginFormDiv = styled.div`
  width: 500px;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`