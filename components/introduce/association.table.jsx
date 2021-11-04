import moment from 'moment'
import { Table } from 'semantic-ui-react'
import AssociationUpdateModal from './association.update.modal'

const AssociationTable = (props) => {
  const associations = props.associations

  return (
    <Table
      celled selectable
      textAlign={'center'}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>idx.</Table.HeaderCell>
          <Table.HeaderCell>단체명</Table.HeaderCell>
          <Table.HeaderCell>위치</Table.HeaderCell>
          <Table.HeaderCell>단체장</Table.HeaderCell>
          <Table.HeaderCell>연락처</Table.HeaderCell>
          <Table.HeaderCell>생성일</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          associations.map((association, idx) =>
              <AssociationUpdateModal
                key={association.uuid}
                association={association}
                trigger={
                  <Table.Row key={association.uuid}>
                    <Table.Cell>{idx + 1}</Table.Cell>
                    <Table.Cell>{association.name}</Table.Cell>
                    <Table.Cell>{association.location}</Table.Cell>
                    <Table.Cell>{association.representative}</Table.Cell>
                    <Table.Cell>{association.contact}</Table.Cell>
                    <Table.Cell>
                      {moment(association.createdAt).
                        format('YYYY-MM-DD HH:mm')}
                    </Table.Cell>
                  </Table.Row>
                }
              />
          )
        }
      </Table.Body>
    </Table>
  )
}

export default AssociationTable