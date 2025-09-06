import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AcademicHistorySection = ({ data, onChange }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    gpa: '',
    achievements: []
  });

  const [newAchievement, setNewAchievement] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAchievement = () => {
    if (newAchievement?.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev?.achievements, newAchievement?.trim()]
      }));
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev?.achievements?.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    const newEntry = {
      id: editingId || Date.now(),
      ...formData
    };

    if (editingId) {
      // Update existing
      const updatedData = data?.map(item => 
        item?.id === editingId ? newEntry : item
      );
      onChange(updatedData);
    } else {
      // Add new
      onChange([...data, newEntry]);
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setFormData({
      institution: item?.institution || '',
      degree: item?.degree || '',
      startDate: item?.startDate || '',
      endDate: item?.endDate || '',
      gpa: item?.gpa || '',
      achievements: item?.achievements || []
    });
    setEditingId(item?.id);
    setIsAddingNew(true);
  };

  const handleDelete = (id) => {
    const updatedData = data?.filter(item => item?.id !== id);
    onChange(updatedData);
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: []
    });
    setIsAddingNew(false);
    setEditingId(null);
    setNewAchievement('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getEducationIcon = (degree) => {
    if (degree?.toLowerCase()?.includes('bachelor')) return 'GraduationCap';
    if (degree?.toLowerCase()?.includes('master')) return 'Award';
    if (degree?.toLowerCase()?.includes('phd') || degree?.toLowerCase()?.includes('doctorate')) return 'Crown';
    if (degree?.toLowerCase()?.includes('diploma')) return 'FileText';
    return 'Book';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Academic History</h3>
          <p className="text-sm text-muted-foreground">
            Your educational background and achievements
          </p>
        </div>
        
        <Button
          onClick={() => setIsAddingNew(true)}
          iconName="Plus"
        >
          Add Education
        </Button>
      </div>
      {/* Add/Edit Form */}
      {isAddingNew && (
        <div className="bg-muted/30 rounded-lg p-6 border border-border">
          <h4 className="font-medium text-foreground mb-4">
            {editingId ? 'Edit Education' : 'Add New Education'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Institution"
              name="institution"
              value={formData?.institution}
              onChange={handleInputChange}
              placeholder="University or School Name"
              required
            />
            
            <Input
              label="Degree/Program"
              name="degree"
              value={formData?.degree}
              onChange={handleInputChange}
              placeholder="e.g., Bachelor of Science in Computer Science"
              required
            />
            
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData?.startDate}
              onChange={handleInputChange}
              required
            />
            
            <Input
              label="End Date (or Expected)"
              name="endDate"
              type="date"
              value={formData?.endDate}
              onChange={handleInputChange}
              required
            />
            
            <Input
              label="GPA (Optional)"
              name="gpa"
              value={formData?.gpa}
              onChange={handleInputChange}
              placeholder="e.g., 3.8"
            />
          </div>

          {/* Achievements */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Achievements & Honors
            </label>
            
            <div className="flex space-x-2 mb-2">
              <Input
                value={newAchievement}
                onChange={(e) => setNewAchievement(e?.target?.value)}
                placeholder="Add an achievement or honor"
                className="flex-1"
                onKeyPress={(e) => e?.key === 'Enter' && handleAddAchievement()}
              />
              <Button
                type="button"
                onClick={handleAddAchievement}
                iconName="Plus"
                size="sm"
              >
                Add
              </Button>
            </div>
            
            {formData?.achievements?.length > 0 && (
              <div className="space-y-2">
                {formData?.achievements?.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between bg-background rounded-md px-3 py-2">
                    <span className="text-sm text-foreground">{achievement}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAchievement(index)}
                      iconName="X"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData?.institution || !formData?.degree}
            >
              {editingId ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      )}
      {/* Education List */}
      <div className="space-y-4">
        {data?.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Icon name="GraduationCap" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Education Added</h4>
            <p className="text-muted-foreground mb-4">
              Add your educational background to help us provide better recommendations
            </p>
            <Button onClick={() => setIsAddingNew(true)} iconName="Plus">
              Add Your First Education
            </Button>
          </div>
        ) : (
          data?.map((item) => (
            <div key={item?.id} className="bg-card border border-border rounded-lg p-6 shadow-tier-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getEducationIcon(item?.degree)} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item?.institution}</h4>
                      <p className="text-sm text-muted-foreground">{item?.degree}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      <span>
                        {formatDate(item?.startDate)} - {formatDate(item?.endDate)}
                      </span>
                    </div>
                    
                    {item?.gpa && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Award" size={14} />
                        <span>GPA: {item?.gpa}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Achievements */}
                  {item?.achievements?.length > 0 && (
                    <div>
                      <button
                        onClick={() => setExpandedId(expandedId === item?.id ? null : item?.id)}
                        className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 mb-2"
                      >
                        <Icon 
                          name={expandedId === item?.id ? 'ChevronDown' : 'ChevronRight'} 
                          size={14} 
                        />
                        <span>{item?.achievements?.length} Achievement{item?.achievements?.length !== 1 ? 's' : ''}</span>
                      </button>
                      
                      {expandedId === item?.id && (
                        <div className="ml-6 space-y-1">
                          {item?.achievements?.map((achievement, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Icon name="Star" size={12} className="text-success" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    iconName="Edit2"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item?.id)}
                    iconName="Trash2"
                    className="text-destructive hover:text-destructive"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AcademicHistorySection;