import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SkillsInterestsSection = ({ skills, interests, onSkillsChange, onInterestsChange }) => {
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(50);
  const [newInterest, setNewInterest] = useState('');
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [skillSuggestions] = useState([
    'JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'Data Science',
    'UI/UX Design', 'Project Management', 'Communication', 'Leadership'
  ]);
  const [interestSuggestions] = useState([
    'Artificial Intelligence', 'Web Development', 'Mobile Development', 'Data Science',
    'Cybersecurity', 'Cloud Computing', 'Blockchain', 'IoT', 'Game Development'
  ]);

  // Skills Management
  const handleAddSkill = () => {
    if (newSkill?.trim()) {
      const skillExists = skills?.some(skill => 
        skill?.name?.toLowerCase() === newSkill?.toLowerCase()
      );
      
      if (!skillExists) {
        onSkillsChange([...skills, {
          name: newSkill?.trim(),
          level: newSkillLevel
        }]);
        setNewSkill('');
        setNewSkillLevel(50);
      }
    }
  };

  const handleUpdateSkillLevel = (skillName, newLevel) => {
    const updatedSkills = skills?.map(skill => 
      skill?.name === skillName ? { ...skill, level: newLevel } : skill
    );
    onSkillsChange(updatedSkills);
    setEditingSkillId(null);
  };

  const handleRemoveSkill = (skillName) => {
    const updatedSkills = skills?.filter(skill => skill?.name !== skillName);
    onSkillsChange(updatedSkills);
  };

  const handleSkillSuggestionClick = (suggestedSkill) => {
    const skillExists = skills?.some(skill => 
      skill?.name?.toLowerCase() === suggestedSkill?.toLowerCase()
    );
    
    if (!skillExists) {
      onSkillsChange([...skills, {
        name: suggestedSkill,
        level: 50
      }]);
    }
  };

  // Interests Management
  const handleAddInterest = () => {
    if (newInterest?.trim()) {
      const interestExists = interests?.some(interest => 
        interest?.toLowerCase() === newInterest?.toLowerCase()
      );
      
      if (!interestExists) {
        onInterestsChange([...interests, newInterest?.trim()]);
        setNewInterest('');
      }
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    const updatedInterests = interests?.filter(interest => interest !== interestToRemove);
    onInterestsChange(updatedInterests);
  };

  const handleInterestSuggestionClick = (suggestedInterest) => {
    const interestExists = interests?.some(interest => 
      interest?.toLowerCase() === suggestedInterest?.toLowerCase()
    );
    
    if (!interestExists) {
      onInterestsChange([...interests, suggestedInterest]);
    }
  };

  const getSkillLevelColor = (level) => {
    if (level >= 80) return 'bg-success';
    if (level >= 60) return 'bg-primary';
    if (level >= 40) return 'bg-warning';
    return 'bg-destructive';
  };

  const getSkillLevelText = (level) => {
    if (level >= 80) return 'Expert';
    if (level >= 60) return 'Advanced';
    if (level >= 40) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="space-y-8">
      {/* Skills Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Skills</h3>
          <p className="text-sm text-muted-foreground">
            Add your technical and soft skills with proficiency levels
          </p>
        </div>

        {/* Add New Skill */}
        <div className="bg-muted/30 rounded-lg p-4 border border-border">
          <h4 className="font-medium text-foreground mb-3">Add New Skill</h4>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e?.target?.value)}
              placeholder="Enter skill name"
              className="flex-1"
              onKeyPress={(e) => e?.key === 'Enter' && handleAddSkill()}
            />
            
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-foreground whitespace-nowrap">
                Level: {newSkillLevel}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(parseInt(e?.target?.value))}
                className="w-24"
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {getSkillLevelText(newSkillLevel)}
              </span>
            </div>
            
            <Button
              onClick={handleAddSkill}
              disabled={!newSkill?.trim()}
              iconName="Plus"
              size="sm"
            >
              Add
            </Button>
          </div>

          {/* Skill Suggestions */}
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-2">
              {skillSuggestions
                ?.filter(suggestion => 
                  !skills?.some(skill => skill?.name?.toLowerCase() === suggestion?.toLowerCase())
                )
                ?.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSkillSuggestionClick(suggestion)}
                  className="px-2 py-1 text-xs bg-background border border-border rounded-md hover:bg-muted transition-micro"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills List */}
        {skills?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills?.map((skill, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-tier-1">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-foreground">{skill?.name}</h5>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingSkillId(editingSkillId === skill?.name ? null : skill?.name)}
                      iconName="Edit2"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSkill(skill?.name)}
                      iconName="Trash2"
                      className="text-destructive hover:text-destructive"
                    />
                  </div>
                </div>
                
                {editingSkillId === skill?.name ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill?.level}
                        onChange={(e) => handleUpdateSkillLevel(skill?.name, parseInt(e?.target?.value))}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium text-foreground w-12">
                        {skill?.level}%
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        size="xs"
                        onClick={() => setEditingSkillId(null)}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {getSkillLevelText(skill?.level)}
                      </span>
                      <span className="font-medium text-foreground">
                        {skill?.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getSkillLevelColor(skill?.level)}`}
                        style={{ width: `${skill?.level}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted/30 rounded-lg">
            <Icon name="Brain" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No skills added yet. Add your first skill above.</p>
          </div>
        )}
      </div>
      {/* Interests Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Interests</h3>
          <p className="text-sm text-muted-foreground">
            Add areas of interest to get personalized recommendations
          </p>
        </div>

        {/* Add New Interest */}
        <div className="bg-muted/30 rounded-lg p-4 border border-border">
          <h4 className="font-medium text-foreground mb-3">Add New Interest</h4>
          
          <div className="flex space-x-3">
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e?.target?.value)}
              placeholder="Enter an area of interest"
              className="flex-1"
              onKeyPress={(e) => e?.key === 'Enter' && handleAddInterest()}
            />
            <Button
              onClick={handleAddInterest}
              disabled={!newInterest?.trim()}
              iconName="Plus"
              size="sm"
            >
              Add
            </Button>
          </div>

          {/* Interest Suggestions */}
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">Popular interests:</p>
            <div className="flex flex-wrap gap-2">
              {interestSuggestions
                ?.filter(suggestion => 
                  !interests?.some(interest => interest?.toLowerCase() === suggestion?.toLowerCase())
                )
                ?.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleInterestSuggestionClick(suggestion)}
                  className="px-2 py-1 text-xs bg-background border border-border rounded-md hover:bg-muted transition-micro"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interests List */}
        {interests?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {interests?.map((interest, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-full border border-primary/20"
              >
                <span className="text-sm font-medium">{interest}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveInterest(interest)}
                  iconName="X"
                  className="text-primary hover:text-primary w-4 h-4 p-0"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted/30 rounded-lg">
            <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No interests added yet. Add your first interest above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsInterestsSection;