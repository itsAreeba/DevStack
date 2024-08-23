import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  userSkills,
  addASkill,
  updateASkill,
  deleteASkill
} from "../action/userActions";

const UserSkills = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [skill_name, setSkillName] = useState("");
  const [itemSelect, setItemSelect] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [eleId, setEleId] = useState(null);

  const dispatch = useDispatch();
  const { skills } = useSelector(state => state.userSkillReducer);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("currentUser"))._id;
    if (id) {
      dispatch(userSkills(id));
    }
  }, [dispatch]);

  const handleEditForm = () => setShowEditForm(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      skill_status: itemSelect,
      skill_name,
      userId: JSON.parse(localStorage.getItem("currentUser"))._id
    };

    const updateData = {
      skill_status: itemSelect,
      skill_name,
      id: eleId,
      uId: JSON.parse(localStorage.getItem("currentUser"))._id
    };

    if (editItem === null) {
      dispatch(addASkill(data));
    } else {
      dispatch(updateASkill(updateData));
    }

    setShowEditForm(false);
  };

  const handleEditFunction = (element, status) => {
    setEditItem(element);
    setShowEditForm(true);
    setSkillName(element.skill_name);
    setItemSelect(element.skill_status);
    setEleId(element._id);
  };

  const deleteSkillHandler = (element) => {
    const updateData = {
      id: element._id,
      uId: JSON.parse(localStorage.getItem("currentUser"))._id
    };

    dispatch(deleteASkill(updateData));
  };

  const AddSkillHandler = () => {
    setShowEditForm(true);
    setEditItem(null);
    setSkillName("");
    setItemSelect("");
    setEleId(null);
  };

  return (
    <div>
      <div style={{ display: showEditForm ? 'block' : 'none' }}>
        <div style={{ background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '5px', maxWidth: '400px' }}>
            <span style={{ cursor: 'pointer', float: 'right', fontSize: '24px', fontWeight: 'bold' }} onClick={() => setShowEditForm(false)}>&times;</span>
            <h2>{editItem === null ? 'Add New Skill' : 'Update Skill'}</h2>
            <form onSubmit={onSubmit}>
              <div>
                <input required type="text" placeholder="Ex. javascript" className="form-control" value={skill_name} onChange={(e) => setSkillName(e.target.value)} />
              </div>
              <div>
                <select value={itemSelect} onChange={e => setItemSelect(e.target.value)}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="form-group mt-2">
                <button className="btn btn-primary" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div>
        {skills && skills.map((item, index) => (
          <div key={item._id} className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-8">
                  <p style={{ fontSize: "20px", fontWeight: "800" }}>{item.skill_name}</p>
                  <p style={{ fontWeight: "300" }}>{item.skill_status && item.skill_status}</p>
                </div>
                <div className="col-md-4 mt-2">
                  <i className="fas fa-2x fa-pencil-alt" onClick={() => handleEditFunction(item, true)}></i>{" "}
                  <i className="fas fa-2x fa-trash-alt" onClick={() => deleteSkillHandler(item)}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{}}>
        <i className="fas fa-plus" onClick={AddSkillHandler}>{" "} Add Skill </i>
      </div>
    </div>
  );
};

export default UserSkills;
