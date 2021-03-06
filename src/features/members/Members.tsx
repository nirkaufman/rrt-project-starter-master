import React, {useEffect} from 'react';
import {MemberInfo} from "./types";
import {TableHeader, TableHeaderRow} from "../../shared/components/TableHeader";
import {Link} from "react-router-dom";
import {TableRow} from "../../shared/components/TableRow";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {allMembers, membersSlice} from "./members.slice";
import {AppState} from "../../shared/types/appState";
import {apiRequest} from "../../shared/utils/api";
import {selectedMembersIds, uiSlice} from "../../app/ui.slice";


const Members = () => {
      const dispatch = useDispatch();

      const members = useSelector<AppState, MemberInfo[]>(allMembers);
      const selectedMembers = useSelector<AppState, number[]>(selectedMembersIds);


      useEffect(() => {
        if (members.length === 0) {
          apiRequest({path: '/members'})
              .then(results => dispatch(membersSlice.actions.membersLoaded(results.data)));
        }
      }, []);

      const selectMember = (memberId:number) => {
        dispatch(uiSlice.actions.memberSelected(memberId));
      };

      return (
          <>
            <TableHeader>
              <h3>Members</h3>
              <TableHeaderRow>
                <button className="button button-outline">Subscribe</button>
                <StyledLink to='/albums' className="button button-outline">Show Albums</StyledLink>
                <StyledLink to='/members/new' className="button button-outline">Add Member</StyledLink>
              </TableHeaderRow>
            </TableHeader>
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Phone</th>
                <th>Picture</th>
                <th>selected</th>
              </tr>
              </thead>
              <tbody>
              {members.map(member => (
                  <TableRow>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.city}</td>
                    <td>{member.phone}</td>
                    <td><img src={member.picture} alt={member.name}/></td>
                    <td><input onClick={() => selectMember(member.id)}
                               checked={selectedMembers.includes(member.id)} type="checkbox"/></td>
                  </TableRow>
              ))}
              </tbody>
            </table>
          </>
      );
    }
;

const StyledLink = styled(Link)`
  margin-left: 5px;
`;


export default Members;
