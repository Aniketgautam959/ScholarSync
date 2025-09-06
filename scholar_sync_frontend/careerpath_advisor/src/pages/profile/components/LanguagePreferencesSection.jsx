import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LanguagePreferencesSection = ({ data, onChange }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    language: '',
    proficiency: 'Beginner',
    certified: false
  });

  const proficiencyLevels = [
    { value: 'Native', label: 'Native', color: 'text-success' },
    { value: 'Advanced', label: 'Advanced', color: 'text-primary' },
    { value: 'Intermediate', label: 'Intermediate', color: 'text-warning' },
    { value: 'Beginner', label: 'Beginner', color: 'text-muted-foreground' }
  ];

  const commonLanguages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Chinese (Mandarin)', 'Japanese', 'Korean', 'Arabic', 'Russian',
    'Hindi', 'Dutch', 'Swedish', 'Norwegian', 'Finnish'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    if (!formData?.language?.trim()) return;

    const newEntry = {
      id: editingId || Date.now(),
      ...formData,
      language: formData?.language?.trim()
    };

    if (editingId) {
      // Update existing
      const updatedData = data?.map(item => 
        item?.id === editingId ? newEntry : item
      );
      onChange(updatedData);
    } else {
      // Add new (check for duplicates)
      const languageExists = data?.some(item => 
        item?.language?.toLowerCase() === formData?.language?.toLowerCase()
      );
      
      if (!languageExists) {
        onChange([...data, newEntry]);
      }
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setFormData({
      language: item?.language || '',
      proficiency: item?.proficiency || 'Beginner',
      certified: item?.certified || false
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
      language: '',
      proficiency: 'Beginner',
      certified: false
    });
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleLanguageSuggestionClick = (language) => {
    const languageExists = data?.some(item => 
      item?.language?.toLowerCase() === language?.toLowerCase()
    );
    
    if (!languageExists) {
      setFormData(prev => ({
        ...prev,
        language: language
      }));
    }
  };

  const getProficiencyIcon = (proficiency) => {
    switch (proficiency) {
      case 'Native': return 'Star';
      case 'Advanced': return 'Award';
      case 'Intermediate': return 'TrendingUp';
      case 'Beginner': return 'Circle';
      default: return 'Circle';
    }
  };

  const getProficiencyColor = (proficiency) => {
    const level = proficiencyLevels?.find(level => level?.value === proficiency);
    return level?.color || 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Language Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Add languages you speak and your proficiency levels
          </p>
        </div>
        
        <Button
          onClick={() => setIsAddingNew(true)}
          iconName="Plus"
        >
          Add Language
        </Button>
      </div>
      {/* Add/Edit Form */}
      {isAddingNew && (
        <div className="bg-muted/30 rounded-lg p-6 border border-border">
          <h4 className="font-medium text-foreground mb-4">
            {editingId ? 'Edit Language' : 'Add New Language'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Input
                label="Language"
                name="language"
                value={formData?.language}
                onChange={handleInputChange}
                placeholder="Enter language name"
                required
              />
              
              {/* Language Suggestions */}
              {!formData?.language && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Common languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {commonLanguages
                      ?.filter(lang => 
                        !data?.some(item => item?.language?.toLowerCase() === lang?.toLowerCase())
                      )
                      ?.slice(0, 6)
                      ?.map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => handleLanguageSuggestionClick(language)}
                        className="px-2 py-1 text-xs bg-background border border-border rounded hover:bg-muted transition-micro"
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Select
              label="Proficiency Level"
              name="proficiency"
              value={formData?.proficiency}
              onChange={handleInputChange}
              required
            >
              {proficiencyLevels?.map((level) => (
                <option key={level?.value} value={level?.value}>
                  {level?.label}
                </option>
              ))}
            </Select>
            
            <div className="flex items-center space-x-2 mt-8">
              <input
                type="checkbox"
                id="certified"
                name="certified"
                checked={formData?.certified}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="certified" className="text-sm font-medium text-foreground">
                Certified
              </label>
            </div>
          </div>

          {/* Proficiency Level Guide */}
          <div className="mb-4 p-3 bg-background rounded-md border border-border">
            <p className="text-xs font-medium text-muted-foreground mb-2">Proficiency Guide:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><strong>Native:</strong> Your first language</div>
              <div><strong>Advanced:</strong> Fluent, can work professionally</div>
              <div><strong>Intermediate:</strong> Conversational, some limitations</div>
              <div><strong>Beginner:</strong> Basic understanding</div>
            </div>
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
              disabled={!formData?.language?.trim()}
            >
              {editingId ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      )}
      {/* Languages List */}
      <div className="space-y-4">
        {data?.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Icon name="Globe" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Languages Added</h4>
            <p className="text-muted-foreground mb-4">
              Add languages you speak to help connect with global opportunities
            </p>
            <Button onClick={() => setIsAddingNew(true)} iconName="Plus">
              Add Your First Language
            </Button>
          </div>
        ) : (
          data?.map((item) => (
            <div key={item?.id} className="bg-card border border-border rounded-lg p-6 shadow-tier-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getProficiencyIcon(item?.proficiency)} size={24} className="text-primary" />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-foreground">{item?.language}</h4>
                      {item?.certified && (
                        <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-md">
                          <Icon name="Award" size={12} />
                          <span className="text-xs font-medium">Certified</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-sm font-medium ${getProficiencyColor(item?.proficiency)}`}>
                        {item?.proficiency}
                      </span>
                      {item?.proficiency !== 'Native' && (
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5]?.map((level) => {
                            const filled = 
                              item?.proficiency === 'Advanced' ? level <= 4 :
                              item?.proficiency === 'Intermediate' ? level <= 3 :
                              level <= 2;
                            
                            return (
                              <div
                                key={level}
                                className={`w-2 h-2 rounded-full ${
                                  filled ? getProficiencyColor(item?.proficiency)?.replace('text-', 'bg-') : 'bg-muted'
                                }`}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
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
      {/* Language Learning Suggestions */}
      {data?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-tier-1">
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Lightbulb" size={18} className="text-primary" />
            <span>Language Learning Tips</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Practice Daily</p>
                <p>Consistent practice helps improve proficiency faster</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="Users" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Find Language Partners</p>
                <p>Connect with native speakers for conversation practice</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="Award" size={16} className="text-secondary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Get Certified</p>
                <p>Certifications validate your skills for employers</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="BookOpen" size={16} className="text-accent mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Use Multiple Resources</p>
                <p>Combine apps, books, and media for better learning</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguagePreferencesSection;