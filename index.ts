import Glossary from "./service/indexer"
import { IPrepare } from './interfaces/index'
import Score from "./service/score"
import { Prepare } from "./service/dataProcessor/prepare"
import SimplePresent from './service/dataProcessor/tenses/simplePresent'
import SimplePresentContinous from "./service/dataProcessor/tenses/simpleContinous"
import PresentPerfect from "./service/dataProcessor/tenses/presentPerfect"
import SimplePast from "./service/dataProcessor/tenses/simplePast"

const text = `I'm tired of being what you want me to be
  Feeling so faithless, lost under the surface

  Don't know what you're expecting of me

  Put under the pressure of walking in your shoes
  Every step that I take is another mistake to you
  (Caught in the undertow, just caught in the undertow)
  I've become so numb
  I can't feel you there
  Become so tired
  So much more aware
  I'm becoming this
  All I want to do
  Is be more like me
  And be less like you
  works like that 
  she watches tv 
  he goes to the park
  he studies a lot  
  she is in front of me 
  he has studied
  `



const score = new Score().score(text)



