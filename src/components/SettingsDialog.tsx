import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import withMobileDialog, { InjectedProps } from '@material-ui/core/withMobileDialog'
import React from 'react'
import { romanizationStandards } from '../services/Transcoder'
import * as S from './strings'
import SpeechSynthesizer from '../services/SpeechSynthesizer'

interface Props extends InjectedProps {
  open: boolean
  onClose: () => void
  showVocalization: boolean
  toggleVocalization: () => void
  showTranscription: boolean
  toggleTranscription: () => void
  showFlashcards: boolean
  toggleFlashcards: () => void
  romanizationStandard: string
  setRomanizationSystem: (romanizationStandard: string) => void
  speechEnabled: boolean
  toggleSpeech: () => void
  voiceName: string
  setVoiceName: (voiceName: string) => void
}

const ResponsiveDialog: React.FC<Props> = props => {
  const {
    fullScreen,
    onClose,
    open,
    showVocalization,
    toggleVocalization,
    showTranscription,
    toggleTranscription,
    showFlashcards,
    toggleFlashcards,
    romanizationStandard,
    setRomanizationSystem,
    speechEnabled,
    toggleSpeech,
    voiceName,
    setVoiceName,
  } = props

  const renderRomanizationSelect = () => (
    <FormControl>
      <InputLabel htmlFor="romanizationStandard-select">{S.ROMANIZATION_SYSTEM}</InputLabel>
      <Select
        native={true}
        value={romanizationStandard}
        onChange={event => setRomanizationSystem(event.target.value)}
        inputProps={{
          name: 'Romanization',
          id: 'romanizationStandard-select',
        }}
      >
        {Object.entries(romanizationStandards).map(([key, value]) => (
          <option key={key} value={key}>
            {value.name}
          </option>
        ))}
      </Select>
    </FormControl>
  )

  const renderVoiceSelect = () => (
    <FormControl>
      <InputLabel htmlFor="romanizationStandard-select">{S.VOICE_NAME}</InputLabel>
      <Select
        native={true}
        value={voiceName}
        onChange={event => setVoiceName(event.target.value)}
        inputProps={{
          name: 'Romanization',
          id: 'romanizationStandard-select',
        }}
      >
        <option value="none">{S.NULL_VOICE}</option>
        {SpeechSynthesizer.getVoices()
          .filter(voice => voice.lang.startsWith('ar-'))
          .map(voice => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
      </Select>
    </FormControl>
  )

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{S.EDIT_SETTINGS}</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={showFlashcards} onChange={toggleFlashcards} />}
            label={S.SHOW_FLASHCARDS}
          />
          <FormControlLabel
            control={<Switch checked={showVocalization} onChange={toggleVocalization} />}
            label={S.SHOW_VOCALIZATION}
          />
          <FormControlLabel
            control={<Switch checked={showTranscription} onChange={toggleTranscription} />}
            label={S.SHOW_TRANSCRIPTION}
          />
          {renderRomanizationSelect()}
          <FormControlLabel
            control={<Switch checked={speechEnabled} onChange={toggleSpeech} />}
            label={S.ENABLE_SPEECH}
          />
          {renderVoiceSelect()}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus={true}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withMobileDialog<Props>()(ResponsiveDialog)
