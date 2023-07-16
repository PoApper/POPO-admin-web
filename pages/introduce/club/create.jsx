import React, { useState } from 'react'
import { useRouter } from "next/router";
import { Form, Message } from "semantic-ui-react";

import IntroduceLayout from '@/components/introduce/introduce.layout'
import { PoPoAxios } from "@/utils/axios.instance";

const clubTypeOptions = [
  { key: 'performance1', text: '공연1', value: 'performance1' },
  { key: 'performance2', text: '공연2', value: 'performance2' },
  { key: 'societyAndReligion', text: '사회종교', value: 'societyAndReligion' },
  { key: 'sports', text: '체육', value: 'sports' },
  { key: 'hobbyAndExhibition', text: '취미전시', value: 'hobbyAndExhibition' },
  { key: 'study', text: '학술', value: 'study' },
]

const ClubIntroduceCreatePage = () => {
  const router = useRouter();

  const [name, setName] = useState('')
  const [short_desc, setShortDesc] = useState('')
  const [clubType, setClubType] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [representative, setRepresentative] = useState('')
  const [contact, setContact] = useState('')

  const handleSubmit = async () => {
    const body = {
      'name': name,
      'short_desc': short_desc,
      'clubType': clubType,
      'content': content,
      'location': location,
      'representative': representative,
      'contact': contact,
    }

    PoPoAxios.post(
      '/introduce/club',
      body,
      { withCredentials: true, },
    ).then(() => {
      alert('소개글을 생성 했습니다.')
      router.push('/introduce/club');
    }).catch((err) => {
      alert('소개글 생성에 실패했습니다.')
      console.log(err)
    })
  }

  return (
    <IntroduceLayout>
      <h3>동아리 소개글 생성</h3>

      <Form>
        <Form.Input
          required
          label={'동아리 이름'}
          onChange={e => setName(e.target.value)}
        />
        <Form.Input
          required
          label={'짧은 설명'}
          placeholder={'예: 개발, 축구, 재즈'}
          onChange={e => setShortDesc(e.target.value)}
        />
        <Form.Select
          required
          label={'분과'}
          options={clubTypeOptions}
          onChange={(e, { value }) => setClubType(value)}
        />
        <Form.TextArea
          required
          label={'소개글'}
          onChange={e => setContent(e.target.value)}
        />
        <Form.Input
          required
          label={'위치'}
          placeholder={'예: 학생회관 OOO호'}
          onChange={e => setLocation(e.target.value)}
        />
        <Form.Input
          label={'대표자'}
          placeholder={'홍길동'}
          onChange={e => setRepresentative(e.target.value)}
        />
        <Form.Input
          label={'연락처'}
          placeholder={'OOOOO@postech.ac.kr'}
          onChange={e => setContact(e.target.value)}
        />

        <Message>
          <Message.Header>장비 이미지</Message.Header>
          <p>
            동아리 로고는 동아리 생성 후에 설정 할 수 있습니다.
            동아리 로고가 없으면 기본 이미지가 표시됩니다.
          </p>
        </Message>

        <Form.Button
          type={'submit'}
          onClick={handleSubmit}
        >
          생성
        </Form.Button>
      </Form>
    </IntroduceLayout>
  )
}

export default ClubIntroduceCreatePage;
